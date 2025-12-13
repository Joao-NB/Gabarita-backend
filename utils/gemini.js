// utils/gemini.js
import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY não encontrada no .env");
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

/**
 * Gera 5 questões de múltipla escolha com alternativas, resposta correta e explicação
 * @param {string} materia 
 * @param {string} assunto 
 * @returns {Promise<Array>} Array de objetos de questões
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

Retorne apenas o JSON puro com o array "questoes", sem markdown ou comentários adicionais.
Exemplo de formato de saída:

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

    // Limpa possíveis blocos de markdown (```json```)
    const cleanedText = response.text.replace(/```json|```/g, "").trim();

    // Tenta parsear JSON
    let dados;
    try {
      dados = JSON.parse(cleanedText);
    } catch (err) {
      console.error("❌ Erro ao parsear JSON do Gemini, retornando texto cru:", err.message);
      return [{
        enunciado: cleanedText,
        alternativas: { a: "", b: "", c: "", d: "" },
        respostaCorreta: "",
        explicacao: ""
      }];
    }

    // Retorna apenas o array de questões
    return dados.questoes || [];

  } catch (err) {
    console.error("❌ ERRO no Gemini:", err.message || err);
    return [{
      enunciado: "Erro ao gerar quiz",
      alternativas: { a: "", b: "", c: "", d: "" },
      respostaCorreta: "",
      explicacao: ""
    }];
  }
}
