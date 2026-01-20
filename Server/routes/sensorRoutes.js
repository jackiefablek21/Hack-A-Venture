import express from "express";
import Sensor from "../models/sensorSchema.js";
import Data from "../models/dataSchema.js";

const router = express.Router();

// GET all sensors
router.get("/", async (req, res) => {
  try {
    const sensors = await Sensor.find().populate("datas");;
    res.json(sensors);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch sensors" });
  }
});

export default router;