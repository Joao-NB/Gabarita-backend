import 'dotenv/config';
import { gerarQuizGemini } from './utils/gemini.js';

async function main() {
  const materia = "Matemática";
  const assunto = "Funções";
  
  const questoes = await gerarQuizGemini(materia, assunto);
  console.log(JSON.stringify(questoes, null, 2));
}

main();
