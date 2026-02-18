// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Staking
 * @notice Stake GBP tokens to gain voting power and tier access
 */
contract Staking is ReentrancyGuard, Ownable {
    using SafeERC20 for IERC20;
    
    IERC20 public gbpToken;
    
    // Tier thresholds
    uint256 public constant BRONZE_THRESHOLD = 1_000 * 10**18;
    uint256 public constant SILVER_THRESHOLD = 10_000 * 10**18;
    uint256 public constant GOLD_THRESHOLD = 50_000 * 10**18;
    uint256 public constant WHALE_THRESHOLD = 250_000 * 10**18;
    
    enum Tier { Observer, Holder, Bronze, Silver, Gold, Whale }
    
    struct StakeInfo {
        uint256 amount;
        uint256 stakedAt;
        uint256 lastClaimAt;
    }
    
    mapping(address => StakeInfo) public stakes;
    uint256 public totalStaked;
    
    // Dividend pool
    uint256 public dividendPool;
    uint256 public dividendPerToken;
    mapping(address => uint256) public dividendDebt;
    
    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event DividendClaimed(address indexed user, uint256 amount);
    event DividendAdded(uint256 amount);
    
    constructor(address _gbpToken) Ownable(msg.sender) {
        gbpToken = IERC20(_gbpToken);
    }
    
    /**
     * @notice Stake GBP tokens
     * @param amount Amount to stake
     */
    function stake(uint256 amount) external nonReentrant {
        require(amount > 0, "Cannot stake 0");
        
        // Claim pending dividends first
        _claimDividends(msg.sender);
        
        gbpToken.safeTransferFrom(msg.sender, address(this), amount);
        
        stakes[msg.sender].amount += amount;
        stakes[msg.sender].stakedAt = block.timestamp;
        totalStaked += amount;
        
        // Update dividend debt
        dividendDebt[msg.sender] = stakes[msg.sender].amount * dividendPerToken / 1e18;
        
        emit Staked(msg.sender, amount);
    }
    
    /**
     * @notice Unstake GBP tokens
     * @param amount Amount to unstake
     */
    function unstake(uint256 amount) external nonReentrant {
        require(amount > 0, "Cannot unstake 0");
        require(stakes[msg.sender].amount >= amount, "Insufficient stake");
        
        // Claim pending dividends first
        _claimDividends(msg.sender);
        
        stakes[msg.sender].amount -= amount;
        totalStaked -= amount;
        
        // Update dividend debt
        dividendDebt[msg.sender] = stakes[msg.sender].amount * dividendPerToken / 1e18;
        
        gbpToken.safeTransfer(msg.sender, amount);
        
        emit Unstaked(msg.sender, amount);
    }
    
    /**
     * @notice Claim pending dividends
     */
    function claimDividends() external nonReentrant {
        _claimDividends(msg.sender);
    }
    
    /**
     * @notice Add dividends to pool (from campaign fees)
     * @param amount Amount to add
     */
    function addDividends(uint256 amount) external {
        require(amount > 0, "Cannot add 0");
        require(totalStaked > 0, "No stakers");
        
        gbpToken.safeTransferFrom(msg.sender, address(this), amount);
        
        dividendPerToken += amount * 1e18 / totalStaked;
        dividendPool += amount;
        
        emit DividendAdded(amount);
    }
    
    /**
     * @notice Get user's tier based on stake
     * @param user Address to check
     * @return Tier enum value
     */
    function getTier(address user) public view returns (Tier) {
        uint256 staked = stakes[user].amount;
        
        if (staked >= WHALE_THRESHOLD) return Tier.Whale;
        if (staked >= GOLD_THRESHOLD) return Tier.Gold;
        if (staked >= SILVER_THRESHOLD) return Tier.Silver;
        if (staked >= BRONZE_THRESHOLD) return Tier.Bronze;
        if (staked > 0) return Tier.Holder;
        return Tier.Observer;
    }
    
    /**
     * @notice Get user's voting power (1:1 with stake for now)
     * @param user Address to check
     * @return Voting power
     */
    function getVotingPower(address user) public view returns (uint256) {
        return stakes[user].amount;
    }
    
    /**
     * @notice Get pending dividends for user
     * @param user Address to check
     * @return Pending dividend amount
     */
    function pendingDividends(address user) public view returns (uint256) {
        uint256 accumulated = stakes[user].amount * dividendPerToken / 1e18;
        return accumulated - dividendDebt[user];
    }
    
    function _claimDividends(address user) internal {
        uint256 pending = pendingDividends(user);
        if (pending > 0) {
            dividendDebt[user] = stakes[user].amount * dividendPerToken / 1e18;
            gbpToken.safeTransfer(user, pending);
            emit DividendClaimed(user, pending);
        }
    }
}
