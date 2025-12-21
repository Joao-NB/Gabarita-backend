import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { rankingGlobal } from "../controllers/ranking.controller.js";

const router = express.Router();

/* Ranking público */
router.get("/ranking", rankingGlobal);

/* Usuário atual */
router.get("/me", authMiddleware, (req, res) => {
  const user = req.user;

  res.json({
    id: user._id,
    nickname: user.nickname,
    avatarId: user.avatarId,
    score: user.score,
    quizzesGerados: user.quizzesGerados,
    provider: user.provider,
  });
});

export default router;
