import { ethers } from "ethers";

// Use the RPC URL for direct backend access
const provider = new ethers.JsonRpcProvider(process.env.U2U_RPC_URL);
const adminWallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

module.exports = { provider, adminWallet };