// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Staking.sol";

/**
 * @title Campaign
 * @notice Manage crowdfunded AI agent operation campaigns
 */
contract Campaign is ReentrancyGuard, Ownable {
    using SafeERC20 for IERC20;
    
    IERC20 public gbpToken;
    Staking public stakingContract;
    
    uint256 public constant PLATFORM_FEE_BPS = 500; // 5%
    uint256 public constant VOTING_PERIOD = 3 days;
    uint256 public constant MIN_VOTING_POWER = 1000 * 10**18; // Bronze tier
    
    enum CampaignStatus { Draft, Voting, Funding, Active, Paused, Complete, Cancelled }
    
    struct CampaignInfo {
        uint256 id;
        address creator;
        string title;
        string description;
        string ipfsHash; // Full details on IPFS
        uint256 fundingGoal;
        uint256 fundingDeadline;
        uint256 currentFunding;
        uint256 votesFor;
        uint256 votesAgainst;
        uint256 votingEndsAt;
        CampaignStatus status;
        uint256 createdAt;
    }
    
    struct Vote {
        bool voted;
        bool support;
        uint256 weight;
    }
    
    uint256 public campaignCount;
    mapping(uint256 => CampaignInfo) public campaigns;
    mapping(uint256 => mapping(address => Vote)) public votes;
    mapping(uint256 => mapping(address => uint256)) public contributions;
    mapping(uint256 => address[]) public campaignAgents;
    
    address public treasury;
    
    event CampaignCreated(uint256 indexed id, address indexed creator, string title, uint256 fundingGoal);
    event VoteCast(uint256 indexed campaignId, address indexed voter, bool support, uint256 weight);
    event CampaignFunded(uint256 indexed campaignId, address indexed funder, uint256 amount);
    event CampaignStatusChanged(uint256 indexed campaignId, CampaignStatus newStatus);
    event AgentJoined(uint256 indexed campaignId, address indexed agent);
    event FundsWithdrawn(uint256 indexed campaignId, address indexed to, uint256 amount);
    
    constructor(address _gbpToken, address _staking, address _treasury) Ownable(msg.sender) {
        gbpToken = IERC20(_gbpToken);
        stakingContract = Staking(_staking);
        treasury = _treasury;
    }
    
    /**
     * @notice Create a new campaign proposal
     * @param title Campaign title
     * @param description Brief description
     * @param ipfsHash IPFS hash for full details
     * @param fundingGoal Funding target in GBP
     * @param fundingDuration Duration for funding phase in seconds
     */
    function createCampaign(
        string calldata title,
        string calldata description,
        string calldata ipfsHash,
        uint256 fundingGoal,
        uint256 fundingDuration
    ) external returns (uint256) {
        require(fundingGoal > 0, "Goal must be > 0");
        require(fundingDuration >= 1 days && fundingDuration <= 30 days, "Invalid duration");
        
        uint256 id = ++campaignCount;
        
        campaigns[id] = CampaignInfo({
            id: id,
            creator: msg.sender,
            title: title,
            description: description,
            ipfsHash: ipfsHash,
            fundingGoal: fundingGoal,
            fundingDeadline: 0, // Set when funding starts
            currentFunding: 0,
            votesFor: 0,
            votesAgainst: 0,
            votingEndsAt: block.timestamp + VOTING_PERIOD,
            status: CampaignStatus.Voting,
            createdAt: block.timestamp
        });
        
        // Store funding duration for later
        // (In production, add a field for this)
        
        emit CampaignCreated(id, msg.sender, title, fundingGoal);
        emit CampaignStatusChanged(id, CampaignStatus.Voting);
        
        return id;
    }
    
    /**
     * @notice Vote on a campaign (stake-weighted)
     * @param campaignId Campaign to vote on
     * @param support True for yes, false for no
     */
    function vote(uint256 campaignId, bool support) external {
        CampaignInfo storage campaign = campaigns[campaignId];
        require(campaign.status == CampaignStatus.Voting, "Not in voting");
        require(block.timestamp < campaign.votingEndsAt, "Voting ended");
        require(!votes[campaignId][msg.sender].voted, "Already voted");
        
        uint256 votingPower = stakingContract.getVotingPower(msg.sender);
        require(votingPower >= MIN_VOTING_POWER, "Insufficient voting power");
        
        votes[campaignId][msg.sender] = Vote({
            voted: true,
            support: support,
            weight: votingPower
        });
        
        if (support) {
            campaign.votesFor += votingPower;
        } else {
            campaign.votesAgainst += votingPower;
        }
        
        emit VoteCast(campaignId, msg.sender, support, votingPower);
    }
    
    /**
     * @notice Finalize voting and move to funding if approved
     * @param campaignId Campaign to finalize
     */
    function finalizeVoting(uint256 campaignId) external {
        CampaignInfo storage campaign = campaigns[campaignId];
        require(campaign.status == CampaignStatus.Voting, "Not in voting");
        require(block.timestamp >= campaign.votingEndsAt, "Voting not ended");
        
        if (campaign.votesFor > campaign.votesAgainst) {
            campaign.status = CampaignStatus.Funding;
            campaign.fundingDeadline = block.timestamp + 14 days; // 2 week funding
            emit CampaignStatusChanged(campaignId, CampaignStatus.Funding);
        } else {
            campaign.status = CampaignStatus.Cancelled;
            emit CampaignStatusChanged(campaignId, CampaignStatus.Cancelled);
        }
    }
    
    /**
     * @notice Fund a campaign
     * @param campaignId Campaign to fund
     * @param amount Amount of GBP to contribute
     */
    function fund(uint256 campaignId, uint256 amount) external nonReentrant {
        CampaignInfo storage campaign = campaigns[campaignId];
        require(campaign.status == CampaignStatus.Funding, "Not accepting funds");
        require(block.timestamp < campaign.fundingDeadline, "Funding ended");
        require(amount > 0, "Amount must be > 0");
        
        gbpToken.safeTransferFrom(msg.sender, address(this), amount);
        
        campaign.currentFunding += amount;
        contributions[campaignId][msg.sender] += amount;
        
        emit CampaignFunded(campaignId, msg.sender, amount);
        
        // Auto-activate if goal reached
        if (campaign.currentFunding >= campaign.fundingGoal) {
            _activateCampaign(campaignId);
        }
    }
    
    /**
     * @notice Activate campaign (after funding goal reached)
     * @param campaignId Campaign to activate
     */
    function _activateCampaign(uint256 campaignId) internal {
        CampaignInfo storage campaign = campaigns[campaignId];
        
        // Take platform fee
        uint256 fee = campaign.currentFunding * PLATFORM_FEE_BPS / 10000;
        uint256 campaignFunds = campaign.currentFunding - fee;
        
        // Send fee to treasury (for dividends)
        gbpToken.safeTransfer(treasury, fee);
        
        campaign.currentFunding = campaignFunds;
        campaign.status = CampaignStatus.Active;
        
        emit CampaignStatusChanged(campaignId, CampaignStatus.Active);
    }
    
    /**
     * @notice Register agent for campaign
     * @param campaignId Campaign to join
     */
    function joinAsAgent(uint256 campaignId) external {
        CampaignInfo storage campaign = campaigns[campaignId];
        require(campaign.status == CampaignStatus.Active, "Campaign not active");
        
        // In production: add agent vetting, staking requirements
        campaignAgents[campaignId].push(msg.sender);
        
        emit AgentJoined(campaignId, msg.sender);
    }
    
    /**
     * @notice Withdraw funds for campaign operations (by authorized agent/lead)
     * @param campaignId Campaign to withdraw from
     * @param amount Amount to withdraw
     * @param to Recipient address
     */
    function withdrawForOperations(uint256 campaignId, uint256 amount, address to) external {
        CampaignInfo storage campaign = campaigns[campaignId];
        require(campaign.status == CampaignStatus.Active, "Campaign not active");
        require(amount <= campaign.currentFunding, "Insufficient funds");
        
        // In production: add proper authorization (multisig, lead only, etc.)
        require(msg.sender == campaign.creator || msg.sender == owner(), "Not authorized");
        
        campaign.currentFunding -= amount;
        gbpToken.safeTransfer(to, amount);
        
        emit FundsWithdrawn(campaignId, to, amount);
        
        // Auto-pause if funds depleted
        if (campaign.currentFunding == 0) {
            campaign.status = CampaignStatus.Paused;
            emit CampaignStatusChanged(campaignId, CampaignStatus.Paused);
        }
    }
    
    /**
     * @notice Complete campaign
     * @param campaignId Campaign to complete
     */
    function completeCampaign(uint256 campaignId) external {
        CampaignInfo storage campaign = campaigns[campaignId];
        require(campaign.status == CampaignStatus.Active || campaign.status == CampaignStatus.Paused, "Invalid status");
        require(msg.sender == campaign.creator || msg.sender == owner(), "Not authorized");
        
        campaign.status = CampaignStatus.Complete;
        emit CampaignStatusChanged(campaignId, CampaignStatus.Complete);
        
        // Return remaining funds to treasury for dividends
        if (campaign.currentFunding > 0) {
            gbpToken.safeTransfer(treasury, campaign.currentFunding);
            campaign.currentFunding = 0;
        }
    }
    
    /**
     * @notice Get campaign info
     * @param campaignId Campaign ID
     */
    function getCampaign(uint256 campaignId) external view returns (CampaignInfo memory) {
        return campaigns[campaignId];
    }
    
    /**
     * @notice Get campaign agents
     * @param campaignId Campaign ID
     */
    function getCampaignAgents(uint256 campaignId) external view returns (address[] memory) {
        return campaignAgents[campaignId];
    }
}
