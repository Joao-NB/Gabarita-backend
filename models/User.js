import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, default: null }, // null para anônimos
    isAnonymous: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    score: { type: Number, default: 0 } // pontuação inicial
  },
  {
    timestamps: true
  }
);

export default mongoose.model("User", UserSchema);
