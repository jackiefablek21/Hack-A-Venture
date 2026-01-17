const { ethers } = require("ethers");
require('dotenv').config();

if (!process.env.U2U_RPC_URL || !process.env.PRIVATE_KEY) {
    throw new Error("Missing U2U configuration in .env file");
}

const provider = new ethers.JsonRpcProvider(process.env.U2U_RPC_URL);
const adminWallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

module.exports = { provider, adminWallet };