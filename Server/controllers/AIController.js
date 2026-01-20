import { GoogleGenerativeAI } from "@google/generative-ai";
import generateMissionDetails from '../utils/AIPrompt.js';
import express from "express";

const router = express.Router();

router.post('/sendPrompt', async (req, res) => {
    try {
        const { userInput, history = [] } = req.body;
        if (!userInput) return res.status(400).json({ error: "Missing userInput" });

        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const formattedHistory = history.map(msg => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: String(msg.content) }] // Must be 'text', not 'content'
        }));

        const chat = model.startChat({
            history: formattedHistory,
        });

        const result = await chat.sendMessage(userInput);

        const response = await result.response;
        const text = response.text();

        res.json({ response: text });

    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "AI Processing Failed", details: error.message });
    }
});

router.post('/generateQuest', async (req, res) => {
    try {
        const {sensor} = req.body;

        const generatedMission = await generateMissionDetails(sensor);
        // const generatedMission = {
        //     "title": "Saigon River Microplastic Sampling",
        //     "description": "Collect and document water samples at designated coordinates to analyze microplastic concentration levels following recent heavy rainfall.",
        //     "amount": 75.50,
        //     "severity": "medium",
        //     "status": "active",
        //     "participantLimit": 15
        // };




        generatedMission.status = "active";
        generatedMission.participants = {};
        generatedMission.sensor = sensor._id;

        console.log("generated quest: ", generatedMission);

        res.json({ response: generatedMission });

    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({error: "AI Processing Failed", details: error.message});
    }
});

export default router;