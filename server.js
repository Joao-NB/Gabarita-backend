  import "./config/env.js";

  import express from "express";
  import cors from "cors";
  import { gerarQuizGemini } from "./utils/gemini.js";
  import { connectToDatabase } from "./db.js";
  import Quiz from "./models/quiz.js";
  import userRoutes from "./routes/users.js";
  import authRoutes from "./routes/auth.routes.js";
  import protectedRoutes from "./routes/protected.routes.js";

  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use("/api/users", userRoutes);
  app.use("/auth", authRoutes);
  app.use("/api", protectedRoutes);

  // 🔎 Health check
  app.get("/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // 🎯 Rota principal do quiz (COM CACHE)
  app.post("/api/quiz", async (req, res) => {
    try {
      const { materia, assunto } = req.body;

      if (!materia || !assunto) {
        return res
          .status(400)
          .json({ error: "Matéria e assunto são obrigatórios" });
      }

      // 🔄 1️⃣ Procura no cache
      const quizCache = await Quiz.findOne({ materia, assunto });

      if (quizCache) {
        console.log("⚡ Quiz retornado do cache");
        return res.json({ questoes: quizCache.questoes });
      }

      // 🤖 2️⃣ Se não existir → chama Gemini
      console.log("🤖 Gerando quiz via Gemini");
      const questoes = await gerarQuizGemini(materia, assunto);

      // 💾 3️⃣ Salva no Mongo
      await Quiz.create({
        materia,
        assunto,
        questoes,
      });

      // 📤 4️⃣ Retorna para o front
      res.json({ questoes });
    } catch (err) {
      console.error("❌ ERRO AO GERAR QUIZ:");
      console.error(err);
      res.status(500).json({ error: "Erro ao gerar quiz" });
    }
  });

  // 🚀 Inicialização correta
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
      console.error(error);
      process.exit(1);
    }
  })();
