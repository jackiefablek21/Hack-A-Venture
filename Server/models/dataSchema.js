import mongoose from "mongoose";

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

});
export default mongoose.model("Data", dataSchema);
