const express = require('express');
const router = express.Router();
const { ethers } = require('ethers');

// 1. Setup Provider & Treasury Wallet
// Use your .env file for these sensitive values!
const provider = new ethers.JsonRpcProvider(process.env.U2U_RPC_URL);
const treasuryWallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// 2. Define the Token Contract
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
// You only need the 'transfer' function in the ABI for this to work
const MINIMAL_ERC20_ABI = [
    "function transfer(address to, uint256 amount) public returns (bool)",
    "function balanceOf(address owner) view returns (uint256)"
];
const tokenContract = new ethers.Contract(CONTRACT_ADDRESS, MINIMAL_ERC20_ABI, treasuryWallet);

router.post('/reward', async (req, res) => {
    try {
        const { walletAddress, missionId, signature, message } = req.body;

        // --- SECURITY CHECK 1: Cryptographic Verification ---
        // This recovers the address that actually signed the message
        const recoveredAddress = ethers.verifyMessage(message, signature);

        if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
            return res.status(401).json({ error: "Signature verification failed. Potential fraud." });
        }

        // --- SECURITY CHECK 2: Mission Validation ---
        // Here you would check your database:
        // 1. Does the missionId exist?
        // 2. Has this wallet already claimed this mission?
        console.log(`Verifying mission ${missionId} for ${walletAddress}...`);

        // --- EXECUTION: Send the Reward ---
        const rewardAmount = ethers.parseUnits("10", 18); // Send 10 SKBD tokens

        console.log("Initiating transfer from Treasury...");
        const tx = await tokenContract.transfer(walletAddress, rewardAmount);

        // Wait for the transaction to be mined on the U2U network
        const receipt = await tx.wait();

        res.status(200).json({
            status: "Success",
            message: "Reward sent!",
            txHash: receipt.hash
        });

    } catch (error) {
        console.error("Reward Error:", error);
        res.status(500).json({ error: "Blockchain transaction failed: " + error.message });
    }
});

module.exports = router;