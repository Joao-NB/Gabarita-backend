import UserQuiz from "../models/UserQuiz.js";
import User from "../models/User.js";
import Quiz from "../models/quiz.js";

/* =========================
   SUBMETER QUIZ
========================= */
export async function submitQuiz(req, res) {
  try {
    const user = req.user;
    const { quizId, score, correctAnswers, wrongAnswers } = req.body;

    if (!quizId || score == null) {
      return res.status(400).json({ error: "Dados incompletos" });
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ error: "Quiz não encontrado" });
    }

    // ❌ Antifraude: impede enviar o mesmo quiz duas vezes
    const alreadySubmitted = await UserQuiz.findOne({
      user: user._id,
      quiz: quiz._id,
    });

    if (alreadySubmitted) {
      return res.status(400).json({ error: "Quiz já submetido" });
    }

    // ✔️ Salva o resultado do quiz
    await UserQuiz.create({
      user: user._id,
      quiz: quiz._id,
      score,
      correctAnswers,
      wrongAnswers,
    });

    // ✔️ Atualiza score global
    user.totalScore += score;
    user.totalQuizzes += 1;

    // 🎖️ Sistema inicial de badges
    if (user.totalQuizzes === 1) {
      user.badges.push({
        badgeId: "first-quiz",
        name: "Primeiro Quiz",
        description: "Completou seu primeiro quiz",
      });
    }

    if (user.totalScore >= 100 && !user.badges.some(b => b.badgeId === "100-points")) {
      user.badges.push({
        badgeId: "100-points",
        name: "100 Pontos",
        description: "Alcançou 100 pontos totais",
      });
    }

    await user.save();

    res.json({
      message: "Quiz submetido com sucesso",
      totalScore: user.totalScore,
      totalQuizzes: user.totalQuizzes,
      badges: user.badges,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao submeter quiz" });
  }
}
