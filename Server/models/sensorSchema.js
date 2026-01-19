const mongoose = require("mongoose");

const sensorSchema = new mongoose.Schema({
  sensorId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },

  location: {
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    }
  },

  riverName: {
    type: String,
    required: true
  },

  metrics: {
    tds: {
      type: Number,
      required: true
    },
    unit: {
      type: String,
      default: "ppm"
    }
  },

  status: {
    type: String,
    enum: ["good", "warning", "danger"],
    required: true
  },

  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Sensor", sensorSchema);