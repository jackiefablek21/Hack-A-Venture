import mongoose from "mongoose";
import Data from '../models/DataSchema.js';
import Sensor from '../models/SensorSchema.js';
import Mission from '../models/MissionSchema.js'; // Ensure the path is correct
import dotenv from "dotenv";
dotenv.config();

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        // 1. Clear all existing data
        await Data.deleteMany({});
        await Sensor.deleteMany({});
        await Mission.deleteMany({});

        // 2. Create the Data entries (Historical readings)
        const dataEntries = await Data.insertMany([
            { dataId: "D-001", metrics: { tds: 120 }, status: "good", recordTime: new Date() },
            { dataId: "D-002", metrics: { tds: 450 }, status: "warning", recordTime: new Date() },
            { dataId: "D-003", metrics: { tds: 850 }, status: "danger", recordTime: new Date() }
        ]);

        // 3. Create Sensors (Linking to the data array)
        const sensors = await Sensor.insertMany([
            {
                sensorId: "SN-MISS-01",
                location: { lat: 29.9511, lng: -90.0715 },
                riverName: "Mississippi River",
                datas: [dataEntries[0]._id]
            },
            {
                sensorId: "SN-HUD-02",
                location: { lat: 40.7128, lng: -74.0060 },
                riverName: "Hudson River",
                datas: [dataEntries[1]._id]
            },
            {
                sensorId: "SN-AMZ-03",
                location: { lat: -3.4653, lng: -62.2159 },
                riverName: "Amazon River",
                datas: [dataEntries[2]._id]
            }
        ]);

        // 4. Create Quests (Linking to the Sensors)
        await Mission.insertMany([
            {
                missionId: "Q-001",
                sensor: sensors[0]._id, // Link to Mississippi Sensor
                title: "River Clarity Inspection",
                description: "Perform a visual check of the water clarity near the Mississippi delta.",
                amount: 50,
                severity: "low",
                status: "active",
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
            },
            {
                missionId: "Q-002",
                sensor: sensors[1]._id, // Link to Hudson Sensor
                title: "TDS Spike Investigation",
                description: "A sudden rise in TDS was detected. Collect a manual sample for lab testing.",
                amount: 250,
                severity: "medium",
                status: "active",
                expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
            },
            {
                missionId: "Q-003",
                sensor: sensors[2]._id, // Link to Amazon Sensor
                title: "Emergency Toxicity Scan",
                description: "Critical pollution levels detected. Deploy emergency bio-filters immediately.",
                amount: 1000,
                severity: "high",
                status: "active",
                expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
            }
        ]);

        console.log("Successfully seeded Data, Sensors, and Quests!");
        process.exit();
    } catch (err) {
        console.error("Seed Error:", err);
        process.exit(1);
    }
};

seedDB();