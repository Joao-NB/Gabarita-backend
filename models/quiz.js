import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema(
  {
    materia: {
      type: String,
      required: true,
    },
    assunto: {
      type: String,
      required: true,
    },
    questoes: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true, // createdAt / updatedAt
  }
);

// 🚀 Cache + TTL (24h)
QuizSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 60 * 60 * 24 } // 24 horas
);

// Evita duplicar quizzes iguais
QuizSchema.index({ materia: 1, assunto: 1 }, { unique: true });

export default mongoose.model("Quiz", QuizSchema);
