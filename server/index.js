import express from "express";
import dotenv from "dotenv";
dotenv.config();
import {ethers} from "ethers";
import cors from "cors";

import {provider, adminWallet} from './utils/blockchain.js';
// 1. Import your rewards route

import rewardRoutes from './controllers/rewards.js';
import {connectDB} from './utils/databaseConnection.js';
import userRoutes from './routes/user.routes.js';

const MONGO_URI = process.env.MONGO_URI
connectDB(MONGO_URI);


const app = express();
app.use(cors());
app.use(express.json());

// 2. Use the route
// This means every route in rewards.js will now start with /api
app.use('/api/missions', rewardRoutes);
app.use("/api/users", userRoutes);

// Existing block number route...
app.get('/api/block', async (req, res) => {
    try {
        const blockNumber = await provider.getBlockNumber();
        res.json({ block: blockNumber });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});