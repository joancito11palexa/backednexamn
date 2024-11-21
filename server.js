import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config(); // Carga el archivo .env con la API_KEY

const app = express();
const port = 3000;

app.use(express.json());

// Endpoint para generar texto
app.post("/generate-text", async (req, res) => {
  try {
    const { prompt } = req.body; // El cliente enviará el texto como un prompt

    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    console.log(prompt)
    const result = await model.generateContent(prompt);
    console.log("listo causa")
    res.json({ response: result.response.text() });
  } catch (error) {
    console.error("Error generating text:", error.message);
    res.status(500).json({ error: "Failed to generate text" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
