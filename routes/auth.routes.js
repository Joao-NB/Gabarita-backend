import express from "express";
import {
  anonymousLogin,
  register,
  login,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/anonymous", anonymousLogin);
router.post("/register", register);
router.post("/login", login);

export default router;
