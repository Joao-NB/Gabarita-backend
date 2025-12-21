import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { submitQuiz } from "../controllers/quiz.controller.js";
import { globalRanking } from "../controllers/ranking.controller.js";

const router = express.Router();

/* 🔒 Rotas protegidas */
router.post("/quiz/submit", authMiddleware, submitQuiz);

/* 🌍 Ranking público (sem auth) */
router.get("/ranking", globalRanking);

export default router;
