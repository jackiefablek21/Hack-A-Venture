import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db/db.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();
const MONGO_URI = process.env.MONGO_URI
connectDB(MONGO_URI);

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});