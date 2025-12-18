import express from "express";
import User from "../models/User.js";
const router = express.Router();

// Endpoint para criar usuário anônimo
router.post("/anonymous", async (req, res) => {
  try {
    const user = new User({ isAnonymous: true });
    await user.save();
    res.json({ userId: user._id });
  } catch (err) {
    console.error("❌ ERRO AO CRIAR USUÁRIO ANÔNIMO:", err);
    res.status(500).json({ error: "Erro ao criar usuário anônimo" });
  }
});

export default router;
