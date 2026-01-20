import mongoose from "mongoose";
import dotenv from "dotenv";

import Data from '../../models/dataSchema.js';
import Sensor from '../../models/sensorSchema.js';
import Mission from '../../models/missionSchema.js';

dotenv.config();

const seedDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://hackflare:hackflare@cluster0.prap8.mongodb.net/Hackflare');

        // 1. Clear all existing data
        await Data.deleteMany({});
        await Sensor.deleteMany({});
        await Mission.deleteMany({});

        // 2. Create the Data entries (Historical readings)
        const dataEntries = await Data.insertMany([
            { metrics: { tds: Math.floor(Math.random() * 1000) }, status: "good", recordTime: new Date() },
            { metrics: { tds: Math.floor(Math.random() * 1000) }, status: "warning", recordTime: new Date() },
            { metrics: { tds: Math.floor(Math.random() * 1000) }, status: "danger", recordTime: new Date() }
        ]);

        // 3. Create Sensors (Linking to the data array)
        const sensors = await Sensor.insertMany([
            {
                location: { lat: 10.79048681125462, lng: 106.68138665565148 },
                riverName: "Saigon River",
                datas: [dataEntries[Math.floor(Math.random() * 3)]._id]
            },
            {
                location: { lat: 10.750082395708914, lng: 106.670648591217 },
                riverName: "Saigon River",
                datas: [dataEntries[Math.floor(Math.random() * 3)]._id]
            },
            {
                location: { lat: 10.72903454160983, lng: 106.6321926919572 },
                riverName: "Saigon River",
                datas: [dataEntries[Math.floor(Math.random() * 3)]._id]
            },
            {
                location: { lat: 10.73594215127016, lng: 106.64409268509549 },
                riverName: "Saigon River",
                datas: [dataEntries[Math.floor(Math.random() * 3)]._id]
            },
            {
                location: { lat: 10.884166660501778, lng: 106.72325448727261 },
                riverName: "Dong Nai River",
                datas: [dataEntries[Math.floor(Math.random() * 3)]._id]
            },
            {
                location: { lat: 10.853192951424703, lng: 106.68026992686303 },
                riverName: "Dong Nai River",
                datas: [dataEntries[Math.floor(Math.random() * 3)]._id]
            },
            {
                location: { lat: 10.813514184866934, lng: 106.77954617021044 },
                riverName: "Dong Nai River",
                datas: [dataEntries[Math.floor(Math.random() * 3)]._id]
            },
            {
                location: { lat: 11.144041750072978, lng: 106.50779878338162 },
                riverName: "Vam Co River",
                datas: [dataEntries[Math.floor(Math.random() * 3)]._id]
            },
            {
                location: { lat: 10.734233609546372, lng: 106.69429125366091 },
                riverName: "Saigon River",
                datas: [dataEntries[Math.floor(Math.random() * 3)]._id]
            }
        ]);

        // 4. Create Quests (Linking to the Sensors)
        const missionTemplates = [
            {
                title: "Routine Water Check",
                description: "Perform a routine water quality inspection.",
                amount: 50,
                severity: "low"
            },
            {
                title: "TDS Spike Investigation",
                description: "Investigate elevated TDS levels.",
                amount: 250,
                severity: "medium"
            },
            {
                title: "Emergency Toxicity Scan",
                description: "Critical pollution detected. Immediate action required.",
                amount: 1000,
                severity: "high"
            }
        ];

        const missions = [];

        sensors.forEach((sensor, sensorIndex) => {
            // Each sensor gets 1–3 missions
            const missionCount = Math.floor(Math.random() * 3) + 1;

            for (let i = 0; i < missionCount; i++) {
                const template = missionTemplates[i % missionTemplates.length];

                missions.push({
                    sensor: sensor._id,
                    title: template.title,
                    description: template.description,
                    amount: template.amount,
                    severity: template.severity,
                    status: "active",
                    expiresAt: new Date(Date.now() + (i + 1) * 24 * 60 * 60 * 1000)
                });
            }
        });

        await Mission.insertMany(missions);

        console.log("Successfully seeded Data, Sensors, and Quests!");
        process.exit();
    } catch (err) {
        console.error("Seed Error:", err);
        process.exit(1);
    }
};

seedDB();