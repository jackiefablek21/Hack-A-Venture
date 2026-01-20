import express from "express";
import User from "../models/userSchema.js";
import Mission from "../models/missionSchema.js";

import { requireAuth, requireRole } from "../middlewares/auth.js";

const router = express.Router();

// Get single mission detail

router.get("/:id", async (req, res) => {
  const mission = await Mission.findById(req.params.id).populate("sensor");

  if (!mission) {
    return res.status(404).json({ message: "Mission not found" });
  }

  res.json(mission);
});


router.get("/sensor/:sensorId", async (req, res) => {
  try {
    const missions = await Mission.find({
      sensor: req.params.sensorId
    });

    res.json(missions);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch missions" });
  }
});


// Users join campaign
router.post(
  "/:id/join",
  requireAuth,
  requireRole("user"),
  async (req, res) => {
    const mission = await Mission.findById(req.params.id);

    if (!mission) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    if (mission.status !== "active") {
      return res.status(400).json({ message: "Campaign is not active" });
    }

    // 🔒 already joined?
    if (mission.participants.includes(req.user._id)) {
      return res.status(400).json({ message: "Already joined this campaign" });
    }

    // 🔒 limit reached?
    if (
      mission.participants.length >= mission.participantLimit
    ) {
      return res.status(400).json({ message: "Campaign is full" });
    }

    // ✅ add participant
    mission.participants.push(req.user._id);
    await mission.save();

    // (optional) track on user
    await User.findByIdAndUpdate(req.user._id, {
      $addToSet: { quests: mission._id }
    });

    res.json({
      message: "Successfully joined campaign",
      participants: mission.participants.length
    });
  }
);

// Create campaign
router.post(
  "/",
  requireAuth,
  requireRole("ngo", "admin"),
  async (req, res) => {
    const mission = await Mission.create(req.body);
    res.status(201).json(mission);
  },
);

router.delete(
  "/:id",
  requireAuth,
  requireRole("admin"),
  async (req, res) => {
    await Mission.findByIdAndDelete(req.params.id);
    res.json({ message: "Campaign deleted" });
  },
);

export default router;