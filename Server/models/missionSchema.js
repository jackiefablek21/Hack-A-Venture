import mongoose from "mongoose";
const { Schema } = mongoose;


const missionSchema = new mongoose.Schema({
    missionId: {
        type: String,
        required: true,
        unique: true
    },

    sensor: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'Sensor'
    },

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    amount: {
      type: Number,
      required: true
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

const Mission = mongoose.models.Mission || mongoose.model('Mission', missionSchema);

export default Mission;