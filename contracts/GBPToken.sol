// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title GBPToken
 * @notice Greater Better People - Platform token for crowdfunded AI agent operations
 * @dev ERC20 token deployed on Base chain
 */
contract GBPToken is ERC20, ERC20Burnable, Ownable {
    uint256 public constant MAX_SUPPLY = 1_000_000_000 * 10**18; // 1 billion tokens
    
    constructor() ERC20("Greater Better People", "GBP") Ownable(msg.sender) {
        // Initial mint to deployer (will be distributed via vesting/airdrop)
        _mint(msg.sender, MAX_SUPPLY);
    }
    
    /**
     * @notice Burn tokens - used for deflationary mechanics
     * @param amount Amount to burn
     */
    function burn(uint256 amount) public override {
        super.burn(amount);
    }
}
