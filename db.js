// db.js
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

let client;
let db;

export async function connectToDatabase() {
  if (db) return db; // Retorna conexão existente se já houver

  client = new MongoClient(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  });

  await client.connect();
  db = client.db("gabarita"); // Nome do seu banco de dados
  console.log("✅ Conectado ao MongoDB");
  return db;
}
