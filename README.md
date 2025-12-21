# 📚 Gabarita – Backend

Backend responsável pela **geração inteligente de quizzes do ENEM**, **gestão de usuários (anônimos e autenticados)**, **pontuação**, **ranking global** e **gamificação**, utilizando **Node.js**, **Express**, **MongoDB Atlas**, **JWT** e **Google Gemini API**.

O sistema foi projetado com foco em:

- ⚡ **Performance**
- 💰 **Redução de custos com IA**
- 🔐 **Segurança**
- 📈 **Escalabilidade**
- 🎮 **Gamificação real**
- 🧠 **Defensabilidade técnica em entrevistas**

🔗 **Backend em produção:**  
https://gabarita-backend.onrender.com/

🔗 **Frontend:**  
https://gabarita.netlify.app/navegacao

---

## 🏗️ Visão Geral da Arquitetura

Fluxo principal da aplicação:

```

Front-end (Angular)
↓
JWT (LocalStorage)
↓
Backend (Node.js + Express)
↓
MongoDB Atlas
↓
┌─────────────────────────────┐
│  Cache de Quizzes (TTL)     │
│  Usuários                   │
│  Pontuação                  │
│  Ranking Global             │
│  Badges / Gamificação       │
└─────────────────────────────┘
↓
Se quiz existir:
→ Retorna do cache
Se não existir:
→ Chama Google Gemini
→ Salva no MongoDB com TTL
→ Retorna ao front

```

---

## ✅ Principais Diferenciais Técnicos

- Cache inteligente de quizzes com **TTL automático**
- Usuários **anônimos com JWT**
- Ranking global persistente
- Pontuação por quiz + soma global
- Sistema de **badges (emblemas)**
- Proteção básica contra abuso/fraude
- Estrutura pronta para OAuth (Google)
- Arquitetura limpa (MVC + Services)

---

## 🛠️ Tecnologias Utilizadas

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- Google Gemini API
- dotenv
- CORS
- Render (Deploy)

---

## 📂 Estrutura de Diretórios

```

GABARITA-BACKEND/
├── config/
│   └── env.js                   # Configuração de variáveis de ambiente
├── controllers/
│   ├── auth.controller.js       # Login, registro e login anônimo
│   ├── quiz.controller.js       # Lógica de quizzes e pontuação
│   └── ranking.controller.js    # Ranking global
├── middlewares/
│   ├── auth.middleware.js       # Proteção JWT
│   └── rateLimit.middleware.js  # Anti-abuso simples
├── models/
│   ├── Quiz.js                  # Cache de quizzes (TTL)
│   ├── User.js                  # Usuários (anônimo / registrado)
│   └── UserQuiz.js              # Histórico e pontuação por quiz
├── routes/
│   ├── auth.routes.js           # Rotas de autenticação
│   ├── protected.routes.js      # Rotas protegidas por JWT
│   └── users.js                 # Rotas de usuário
├── utils/
│   ├── auth.js                  # Helpers de autenticação
│   ├── gemini.js                # Integração com IA
│   └── jwt.js                   # Criação e validação de tokens
├── db.js                        # Conexão com MongoDB
├── server.js                    # Entry point
├── .env                         # Variáveis sensíveis (não versionar)
├── .gitignore
├── package.json
├── package-lock.json
└── README.md

````

---

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000
MONGODB_URI=mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/gabarita
GEMINI_API_KEY=sua_chave_gemini

JWT_SECRET=super_secret_key_gabarita
JWT_EXPIRES_IN=7d
````

⚠️ **Nunca versionar o `.env`**

---

## 👤 Tipos de Usuário

### 🧑 Usuário Anônimo

* Entra apenas com:

  * nickname
  * avatar (pré-definido)
* Recebe:

  * JWT
  * userId
* Pode:

  * jogar quizzes
  * pontuar
  * aparecer no ranking
* Pode futuramente:

  * converter para conta registrada sem perder dados

---

### 🔐 Usuário Registrado

* Login com email + senha
* Senha criptografada (bcrypt)
* Histórico completo
* Ranking global
* Badges
* Preparado para OAuth (Google)

---

## 🎯 Sistema de Pontuação

* Cada quiz gera:

  * pontuação individual
* O usuário possui:

  * totalPoints → soma global
  * quizzesCount → total de quizzes jogados
* Ranking global é baseado em:

  * totalPoints (decrescente)

---

## 🏆 Ranking Global

Exibe:

* Avatar
* Nickname
* Total de quizzes gerados/jogados
* Pontuação acumulada

Ordenação:

```
ORDER BY totalPoints DESC
```

---

## 🎖️ Sistema de Badges (Gamificação)

Exemplos:

* 🥉 Primeiro Quiz
* 🥈 10 Quizzes
* 🥇 100 Pontos
* 🔥 Sequência de acertos
* 🧠 Especialista por matéria (futuro)

Badges ficam salvos no usuário.

---

## ⏱️ Cache de Quizzes (TTL)

* Cache direto no MongoDB
* TTL configurado para **48 horas**
* Remoção automática pelo MongoDB
* Nenhum cron job necessário

Benefícios:

* Redução de chamadas à IA
* Menor custo
* Respostas mais rápidas

---

## 🔐 Segurança & Anti-Fraude

* JWT em todas as rotas sensíveis
* Middleware de autenticação
* Rate limit simples por IP
* Usuário não envia pontuação → backend calcula
* Estrutura pronta para:

  * antifraude avançado
  * detecção de padrões

---

## ▶️ Executar Localmente

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/gabarita-backend.git
```

2. Instale as dependências:

```bash
npm install
```

3. Configure o `.env`

4. Inicie o servidor:

```bash
node server.js
```

Servidor local:

```
http://localhost:3000
```

---

## 🔎 Health Check

```
GET /health
```

Resposta:

```json
{ "status": "ok" }
```

---

## 📡 Endpoint Principal

### Gerar Quiz (com cache)

```
POST /api/quiz
```

Body:

```json
{
  "materia": "Matemática",
  "assunto": "Funções"
}
```

Resposta:

```json
{
  "questoes": [ ... ]
}
```

---

## 🚀 Deploy

* Backend: **Render**
* Banco de Dados: **MongoDB Atlas**
* IA: **Google Gemini API**

---

## 🧪 Estado do Projeto

✔ Backend arquiteturalmente concluído
✔ Pronto para front-end
✔ Defensável em entrevistas
✔ Escalável
✔ Gamificado

---

## 🧑‍💻 Autor

Projeto desenvolvido por **João Guilherme** 🚀

---

## 📄 Licença

Projeto educacional e experimental.

```
```
