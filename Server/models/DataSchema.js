import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
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

const Data = mongoose.models.Data || mongoose.model('Data', dataSchema);

export default Data;
