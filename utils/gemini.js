// utils/gemini.js
import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY não encontrada no .env");
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function gerarQuizGemini(materia, assunto) {
  try {
    const prompt = `Crie 5 questões de múltipla escolha sobre a matéria "${materia}" e o assunto "${assunto}"`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // ou outro modelo disponível
      contents: prompt,
    });

    // Divide por linhas e remove vazios
    return response.text.split("\n").filter(Boolean);
  } catch (err) {
    console.error("❌ ERRO no Gemini:", err.message || err);
    return ["Erro ao gerar quiz"];
  }
}
