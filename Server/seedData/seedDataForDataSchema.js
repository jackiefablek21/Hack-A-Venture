import mongoose from "mongoose";
import Data from '../models/dataSchema.js';
import Sensor from '../models/sensorSchema.js';
import dotenv from "dotenv";
dotenv.config();

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        await Data.deleteMany({});
        await Sensor.deleteMany({});

        // 1. Create a large batch of Data first
        const dataEntries = await Data.insertMany([
            // Sensor 1 Readings (Mississippi)
            { dataId: "D-001", metrics: { tds: 120 }, status: "good", recordTime: new Date('2026-01-18T10:00:00') },
            { dataId: "D-002", metrics: { tds: 155 }, status: "good", recordTime: new Date('2026-01-19T10:00:00') },
            { dataId: "D-003", metrics: { tds: 410 }, status: "warning", recordTime: new Date('2026-01-20T10:00:00') },

            // Sensor 2 Readings (Hudson)
            { dataId: "D-004", metrics: { tds: 800 }, status: "danger", recordTime: new Date('2026-01-18T11:00:00') },
            { dataId: "D-005", metrics: { tds: 750 }, status: "danger", recordTime: new Date('2026-01-19T11:00:00') },
            { dataId: "D-006", metrics: { tds: 490 }, status: "warning", recordTime: new Date('2026-01-20T11:00:00') },

            // Sensor 3 Readings (Amazon)
            { dataId: "D-007", metrics: { tds: 50 }, status: "good", recordTime: new Date('2026-01-18T12:00:00') },
            { dataId: "D-008", metrics: { tds: 55 }, status: "good", recordTime: new Date('2026-01-19T12:00:00') },
            { dataId: "D-009", metrics: { tds: 60 }, status: "good", recordTime: new Date('2026-01-20T12:00:00') }
        ]);

        // 2. Create Sensors and link to the LATEST Data entry for each
        await Sensor.insertMany([
            {
                sensorId: "SN-MISS-01",
                location: { lat: 29.9511, lng: -90.0715 },
                dataId: dataEntries[2]._id, // Points to D-003 (Warning)
                riverName: "Mississippi River"
            },
            {
                sensorId: "SN-HUD-02",
                location: { lat: 40.7128, lng: -74.0060 },
                dataId: dataEntries[5]._id, // Points to D-006 (Warning)
                riverName: "Hudson River"
            },
            {
                sensorId: "SN-AMZ-03",
                location: { lat: -3.4653, lng: -62.2159 },
                dataId: dataEntries[8]._id, // Points to D-009 (Good)
                riverName: "Amazon River"
            }
        ]);

        console.log(`Successfully seeded 3 Sensors and ${dataEntries.length} Data records.`);
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();