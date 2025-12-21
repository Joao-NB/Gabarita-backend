import mongoose from "mongoose";

const BadgeSchema = new mongoose.Schema(
  {
    badgeId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    earnedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["anonymous", "local", "google"],
      required: true,
    },

    nickname: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },

    avatar: {
      type: String,
      required: true, // id ou nome do avatar (definido no front)
    },

    email: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      select: false,
    },

    totalScore: {
      type: Number,
      default: 0,
    },

    totalQuizzes: {
      type: Number,
      default: 0,
    },

    badges: {
      type: [BadgeSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
