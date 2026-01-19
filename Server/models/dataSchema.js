const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    dataId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },

    metrics: {
        tds: {
            type: Number,
            required: true
        }
    },

    recordTime: {
        type: Date,
        default: Date.now
    },

    // status: {
    //     type: String,
    //     enum: ["good", "warning", "danger"],
    //     required: true
    // },
});

module.exports = mongoose.model("Data", dataSchema);