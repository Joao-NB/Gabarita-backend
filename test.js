import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

console.log("OPENAI_API_KEY:", process.env.OPENAI_API_KEY);

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function test() {
  try {
    const res = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: "Diga 'Olá Mundo'" }],
    });
    console.log(res.choices[0].message.content);
  } catch (err) {
    console.error(err);
  }
}

test();
