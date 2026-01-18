const express = require('express');
const { ethers } = require("ethers");
require('dotenv').config();
const cors = require('cors');
const { provider, adminWallet } = require('./utils/blockchain');

// 1. Import your rewards route
const rewardRoutes = require('./controllers/rewards');

const app = express();
app.use(cors());
app.use(express.json());

// 2. Use the route
// This means every route in rewards.js will now start with /api
app.use('/api', rewardRoutes);

// Existing block number route...
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
});