import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import express from "express";

const router = express.Router();

router.post('/sendPrompt', async (req, res) => {
    try {
        const { userInput, history = [] } = req.body;

        if (!userInput) return res.status(400).json({ error: "Missing userInput" });

        // VERIFY KEY BEFORE INVOKING
        if (!process.env.OPENAI_API_KEY) {
            throw new Error("OPENAI_API_KEY is not defined in environment variables");
        }

        const model = new ChatOpenAI({
            modelName: "gpt-4o",
            temperature: 0.7,
            apiKey: process.env.OPENAI_API_KEY,
            maxRetries: 1 // Don't hang forever on failure
        });

        const formattedHistory = history.map(msg => [
            msg.role === 'assistant' ? 'ai' : 'human',
            msg.content
        ]);

        const prompt = ChatPromptTemplate.fromMessages([
            ["system", "You are a helpful assistant in a MERN application."],
            ...formattedHistory,
            ["user", "{input}"]
        ]);

        const chain = prompt.pipe(model).pipe(new StringOutputParser());

        console.log("Invoking LangChain...");
        const result = await chain.invoke({ input: userInput });
        console.log("Success!");

        res.json({ response: result });

    } catch (error) {
        console.error("Critical Route Error:", error.message);
        res.status(500).json({ error: "AI Processing Failed", details: error.message });
    }
});

export default router;