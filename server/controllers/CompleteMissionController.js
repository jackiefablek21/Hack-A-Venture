// backend/server.js
const { ethers } = require("ethers");
require('dotenv').config();

const abi = process.env.contractJson.abi;

const rewardUser = async (req, res) => {
    const { walletAddress, missionId, signature, message } = req.body;

    try {
        // 1. VERIFY: Did this address actually sign this message?
        const recoveredAddress = ethers.verifyMessage(message, signature);

        if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
            return res.status(401).json({ error: "Invalid signature! Fraud detected." });
        }

        // 2. LOGIC: Check your database to see if missionId is valid
        // const mission = await Mission.findById(missionId);

        // 3. TRANSFER: Setup the Treasury Wallet
        const provider = new ethers.JsonRpcProvider(process.env.U2U_RPC_URL);
        const treasuryWallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

        const contract = new ethers.Contract(
            process.env.CONTRACT_ADDRESS,
            CONTRACT_ABI,
            treasuryWallet
        );

        console.log(`Sending 10 SKBD to ${walletAddress}...`);
        const tx = await contract.transfer(walletAddress, ethers.parseUnits("10", 18));
        await tx.wait();

        res.json({ status: "Success", txHash: tx.hash });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};