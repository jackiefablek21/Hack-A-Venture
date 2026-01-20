import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

export default async function generateMissionDetails(sensorContext) {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY_1);

    // 1. Define the model with System Instructions
    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash-lite",
        systemInstruction: "You are a mission generator for an environmental monitoring system. " +
            "Generate a single mission JSON object based on the user request and sensor data provided. " +
            "The 'severity' must be one of: 'low', 'medium', 'high'."
    });

    // 2. Define the exact JSON Schema for the output
    const schema = {
        type: "object",
        properties: {
            title: { type: "string" },
            description: { type: "string" },
            amount: { type: "number", description: "The reward amount or numeric value for the mission" }, // Ensure this is 'number'
            severity: { type: "string", enum: ["low", "medium", "high"] },
            status: { type: "string" },
            participantLimit: { type: "number" },
        },
        required: ["title", "description", "severity", "status", "amount", "participantLimit"]
    };

    // 3. Set up the generation config
    const generationConfig = {
        responseMimeType: "application/json",
        responseSchema: schema,
    };

    const prompt = `
        Sensor Context: ${JSON.stringify(sensorContext)}
        Current Time: ${new Date().toISOString()}
    `;

    try {
        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig
        });

        // Parse and return the generated JSON
        return JSON.parse(result.response.text());
    } catch (error) {
        console.error("AI Generation Error:", error);
        return null;
    }
}