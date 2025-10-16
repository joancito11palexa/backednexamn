import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000","http://192.168.0.109:3000"],
  })
);
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

app.post("/generate-text", async (req, res) => {
  try {
    const { prompt } = req.body;
    const result = await model.generateContent(prompt);
    console.log(result.response.text() )
    res.json({ response: result.response.text() });
  } catch (error) {
    console.error("Error generating text:", error.message);
    res.status(500).json({ error: "Failed to generate text" });
  }
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
