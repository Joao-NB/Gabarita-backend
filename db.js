// db.js
import "./config/env.js";
import mongoose from "mongoose";

export async function connectToDatabase() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error("❌ MONGO_URI não definida");
  }

  try {
    await mongoose.connect(uri, {
      dbName: "quizdb",
    });

    console.log("✅ MongoDB conectado com sucesso");
  } catch (error) {
    console.error("❌ Erro ao conectar no MongoDB:", error.message);
    throw error;
  }
}
