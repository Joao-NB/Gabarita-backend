import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY não encontrada no .env");
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

/**
 * Gera 5 questões de múltipla escolha com alternativas, resposta correta e explicação
 */
export async function gerarQuizGemini(materia, assunto) {
  try {
    const prompt = `
Crie 5 questões de múltipla escolha sobre a matéria "${materia}" e o assunto "${assunto}".
Cada questão deve ter:
- enunciado
- 4 alternativas: a, b, c, d
- resposta correta
- explicação da resposta

Retorne em formato JSON como este:
{
  "questoes": [
    {
      "enunciado": "...",
      "alternativas": { "a": "...", "b": "...", "c": "...", "d": "..." },
      "respostaCorreta": "a",
      "explicacao": "..."
    }
  ]
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    // Tenta parsear JSON retornado
    let dados;
    try {
      dados = JSON.parse(response.text);
    } catch {
      console.error("❌ Erro ao parsear JSON do Gemini, retornando texto cru");
      return { questoes: [{ enunciado: response.text, alternativas: {}, respostaCorreta: "", explicacao: "" }] };
    }

    return dados.questoes || [];
  } catch (err) {
    console.error("❌ ERRO no Gemini:", err.message || err);
    return [{ enunciado: "Erro ao gerar quiz", alternativas: {}, respostaCorreta: "", explicacao: "" }];
  }
}
