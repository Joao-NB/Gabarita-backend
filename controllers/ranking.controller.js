import User from "../models/User.js";

/* =========================
   RANKING GLOBAL
========================= */
export async function globalRanking(req, res) {
  try {
    const ranking = await User.find()
      .select("nickname avatar totalScore totalQuizzes badges")
      .sort({ totalScore: -1 })
      .limit(50);

    res.json(ranking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar ranking" });
  }
}
