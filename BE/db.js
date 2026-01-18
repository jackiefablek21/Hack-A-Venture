import mongoose from "mongoose";

export const connectDB = async (MONGO_URI) => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("mongo connected")
    } 
    catch (err) {
        console.log(err)
    }
};