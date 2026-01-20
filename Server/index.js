import express from "express";
import dotenv from "dotenv";
dotenv.config();

import {ethers} from "ethers";
import cors from "cors";
import {provider, adminWallet} from './utils/blockchain.js';
import rewardRoutes from './controllers/MissionController.js';
import userRoutes from './routes/userRoutes.js';
import sensorRoutes from './routes/sensorRoutes.js';
import missionRoutes from './routes/missionRoutes.js';
import langchainController from './controllers/AIController.js';
import {connectDB} from './utils/databaseConnection.js';

const MONGO_URI = process.env.MONGO_URI
connectDB(MONGO_URI);


const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Use the route
app.use('/api/missions', rewardRoutes);
app.use('/api/ai', langchainController);
app.use("/api/users", userRoutes);
app.use("/api/sensors", sensorRoutes);
app.use("/api/missions", missionRoutes);

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