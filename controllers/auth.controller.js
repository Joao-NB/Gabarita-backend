import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateToken } from "../utils/jwt.js";

/* =========================
   LOGIN ANÔNIMO
========================= */
export async function anonymousLogin(req, res) {
  try {
    const { nickname, avatar } = req.body;

    if (!nickname || !avatar) {
      return res.status(400).json({ error: "Nickname e avatar são obrigatórios" });
    }

    const user = await User.create({
      type: "anonymous",
      nickname,
      avatar,
    });

    const token = generateToken({
      userId: user._id,
      type: user.type,
    });

    res.json({
      token,
      user: {
        id: user._id,
        nickname: user.nickname,
        avatar: user.avatar,
        totalScore: user.totalScore,
        totalQuizzes: user.totalQuizzes,
        badges: user.badges,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao criar usuário anônimo" });
  }
}

/* =========================
   REGISTRO
========================= */
export async function register(req, res) {
  try {
    const { nickname, avatar, email, password } = req.body;

    if (!nickname || !avatar || !email || !password) {
      return res.status(400).json({ error: "Dados incompletos" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      type: "local",
      nickname,
      avatar,
      email,
      password: hashedPassword,
    });

    const token = generateToken({
      userId: user._id,
      type: user.type,
    });

    res.json({
      token,
      user: {
        id: user._id,
        nickname: user.nickname,
        avatar: user.avatar,
        totalScore: user.totalScore,
        totalQuizzes: user.totalQuizzes,
        badges: user.badges,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao registrar usuário" });
  }
}

/* =========================
   LOGIN
========================= */
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const token = generateToken({
      userId: user._id,
      type: user.type,
    });

    res.json({
      token,
      user: {
        id: user._id,
        nickname: user.nickname,
        avatar: user.avatar,
        totalScore: user.totalScore,
        totalQuizzes: user.totalQuizzes,
        badges: user.badges,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao fazer login" });
  }
}
