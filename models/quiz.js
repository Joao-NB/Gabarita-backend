import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema(
  {
    materia: {
      type: String,
      required: true,
      trim: true,
    },

    assunto: {
      type: String,
      required: true,
      trim: true,
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

/* =========================
   CACHE COM TTL (48h)
========================= */
QuizSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 60 * 60 * 48 } // 48 horas
);

/* =========================
   EVITA DUPLICAÇÃO
========================= */
QuizSchema.index(
  { materia: 1, assunto: 1 },
  { unique: true }
);

export default mongoose.model("Quiz", QuizSchema);
