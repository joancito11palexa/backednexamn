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
    origin: "http://localhost:3000/",
  })
);

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

app.post("/generate-text", async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log("Prompt recibido:", prompt);

    const result = await model.generateContent(prompt);
    const response = result.candidates[0]?.content?.parts[0]?.text || "Error al obtener respuesta";

    console.log("Respuesta generada:", response);
    res.json({ response });
  } catch (error) {
    console.error("Error generating text:", error);
    res.status(500).json({ error: error.message || "Failed to generate text" });
  }
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
