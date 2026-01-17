import express from "express";
import User from "../models/User.js";

const router = express.Router();

// get all users
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// create user 
router.post("/", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

export default router;