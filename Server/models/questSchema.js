import mongoose from "mongoose";

const questSchema = new mongoose.Schema({
  questId: {
    type: String,
    required: true,
    unique: true
  },

  sensorId: {
    type: String,
    required: true,
    index: true
  },

  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  reward: {
    amount: {
      type: Number,
      required: true
    },
    token: {
      type: String,
      default: "TrietCoin"
    }
  },

  severity: {
    type: String,
    enum: ["low", "medium", "high"],
    required: true
  },

  status: {
    type: String,
    enum: ["active", "completed", "expired"],
    default: "active"
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  expiresAt: {
    type: Date
  }
});

export default mongoose.model("Quest", questSchema);