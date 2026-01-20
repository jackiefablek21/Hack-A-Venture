//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// This imports the gold-standard for tokens
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract HydraCoin is ERC20 {
    constructor() ERC20("HydraCoin", "HYDRACOIN") {
        // Mint 1 million tokens (with 18 decimals) to the deployer
        _mint(msg.sender, 1000000 * 10**decimals());
    }
}