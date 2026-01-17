const express = require('express');
const { ethers } = require("ethers");
require('dotenv').config();
const cors = require('cors');
const { provider, adminWallet } = require('./utils/blockchain');

const app = express();
app.use(cors());
app.use(express.json());

// Example Route: Get U2U Block Number
app.get('/api/block', async (req, res) => {
    try {
        const blockNumber = await provider.getBlockNumber();
        res.json({ block: blockNumber });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log("Connected to U2U Solaris via RPC");
});