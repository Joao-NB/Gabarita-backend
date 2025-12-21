import mongoose from "mongoose";

const UserQuizSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },

    score: {
      type: Number,
      required: true,
    },

    correctAnswers: {
      type: Number,
      required: true,
    },

    wrongAnswers: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/* Evita múltiplas submissões do mesmo quiz */
UserQuizSchema.index({ user: 1, quiz: 1 }, { unique: true });

export default mongoose.model("UserQuiz", UserQuizSchema);
