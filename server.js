// ⚠️ PRIMEIRO IMPORT DE TODOS
import "./config/env.js";

import express from "express";
import cors from "cors";
import { gerarQuizGemini } from "./utils/gemini.js";
// import { connectToDatabase } from "./db.js";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/quiz", async (req, res) => {
  try {
    const { materia, assunto } = req.body;

    if (!materia || !assunto) {
      return res
        .status(400)
        .json({ error: "Matéria e assunto são obrigatórios" });
    }

    const questoes = await gerarQuizGemini(materia, assunto);
    res.json({ questoes });
  } catch (err) {
    console.error("❌ ERRO AO GERAR QUIZ:", err.message || err);
    res.status(500).json({ error: "Erro ao gerar quiz" });
  }
});

// 👉 Quando for ativar o Mongo, basta descomentar
// connectToDatabase();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
