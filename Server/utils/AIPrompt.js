import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

export default async function generateMissionDetails(sensorContext) {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

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
            missionId: { type: "string" },
            sensor: { type: "string", description: "The sensor context provided in the propmt" },
            title: { type: "string" },
            description: { type: "string" },
            amount: { type: "number", description: "The reward amount or numeric value for the mission" }, // Ensure this is 'number'
            severity: { type: "string", enum: ["low", "medium", "high"] },
            status: { type: "string" },
            expiresAt: { type: "string" }
        },
        required: ["missionId", "sensor", "title", "description", "severity", "status", "amount"]
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

// const generedJSON = await generateMissionDetails("{\n" +
//     "    \"location\": {\n" +
//     "        \"lat\": 10.750082395708914,\n" +
//     "        \"lng\": 106.670648591217\n" +
//     "    },\n" +
//     "    \"_id\": \"696f1b8e7fe42e4f7be5c949\",\n" +
//     "    \"sensorId\": \"SN-VN-02\",\n" +
//     "    \"datas\": [\n" +
//     "        {\n" +
//     "            \"metrics\": {\n" +
//     "                \"tds\": 650\n" +
//     "            },\n" +
//     "            \"_id\": \"696f1b8e7fe42e4f7be5c944\",\n" +
//     "            \"dataId\": \"D-001\",\n" +
//     "            \"recordTime\": \"2026-01-20T06:07:10.715Z\",\n" +
//     "            \"__v\": 0\n" +
//     "        }\n" +
//     "    ],\n" +
//     "    \"riverName\": \"Saigon River\",\n" +
//     "    \"lastUpdated\": \"2026-01-20T06:07:10.823Z\",\n" +
//     "    \"__v\": 0\n" +
//     "}");
//
// console.log("Gen JSON: ", generedJSON);