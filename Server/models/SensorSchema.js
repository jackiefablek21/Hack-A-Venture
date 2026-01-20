import mongoose from "mongoose";
const { Schema } = mongoose;

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

    datas:{
        type: [Schema.Types.ObjectId],
        ref: 'Data'
    },

    riverName: {
        type: String,
        required: true
    },

    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

const Sensor = mongoose.models.Sensor || mongoose.model('Sensor', sensorSchema);

export default Sensor;