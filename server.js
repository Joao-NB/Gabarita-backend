import "./config/env.js";

import express from "express";
import cors from "cors";
import { gerarQuizGemini } from "./utils/gemini.js";
import { connectToDatabase } from "./db.js";

const app = express();

app.use(cors());
app.use(express.json());

// 🔎 Health check (IMPORTANTE para Render)
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// 🎯 Rota principal do quiz
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
    console.error("❌ ERRO AO GERAR QUIZ:");
    console.error(err); // 👈 erro COMPLETO
    res.status(500).json({ error: "Erro ao gerar quiz" });
  }
});

// 🚀 Inicialização correta (Mongo ANTES do listen)
const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await connectToDatabase();
    console.log("✅ Conectado ao MongoDB com sucesso");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Falha ao iniciar o servidor");
    console.error(error); // 👈 ERRO REAL (fundamental)
    process.exit(1);
  }
})();
