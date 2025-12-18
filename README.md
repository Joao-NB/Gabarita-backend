# 📚 Gabarita – Backend

API responsável pela geração, cache inteligente e entrega de quizzes educacionais do ENEM, utilizando **Node.js**, **Express**, **MongoDB Atlas** e a **API do Google Gemini**.

O backend foi projetado com foco em **performance**, **redução de custos com IA** e **escalabilidade**, reutilizando quizzes previamente gerados por meio de cache com **TTL (Time To Live)** no banco de dados.

🔗 Backend em produção:  
https://gabarita-backend.onrender.com/

🔗 Frontend:  
https://gabarita.netlify.app/navegacao

---

## 🏗️ Arquitetura da Aplicação

Fluxo principal da aplicação:

```
Front-end (Angular)
        ↓
Backend (Node.js + Express)
        ↓
Consulta MongoDB (cache com TTL)
        ↓
Se o quiz existir e estiver válido:
    → Retorna o quiz do banco
Se não existir ou estiver expirado:
    → Chama a API do Google Gemini
    → Salva o quiz no MongoDB com TTL
    → Retorna o quiz ao front-end
```

### Benefícios da Arquitetura

- Redução significativa de chamadas à API de IA
- Menor custo operacional
- Respostas mais rápidas
- Cache automático com expiração
- Backend pronto para escalar

---

## 🛠️ Tecnologias Utilizadas

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- Google Gemini API
- dotenv
- CORS
- Render (Deploy)

---

## 📂 Estrutura do Projeto

```
GABARITA-BACKEND
├── config
│   └── env.js
├── utils
│   └── gemini.js
├── models
│   └── quiz.js
├── db.js
├── server.js
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000
MONGODB_URI=mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/quizdb?retryWrites=true&w=majority
GEMINI_API_KEY=sua_chave_da_api_gemini
```

⚠️ Nunca versionar o arquivo `.env`

---

## ⏱️ Cache com TTL (Time To Live)

O cache dos quizzes é feito diretamente no MongoDB utilizando **TTL Index**.

### Funcionamento

- Cada quiz possui o campo `createdAt`
- O MongoDB remove automaticamente o documento após o tempo configurado
- Nenhum cron job é necessário

### Exemplo de Schema com TTL

```js
createdAt: {
  type: Date,
  default: Date.now,
  expires: 60 * 60 * 24 // 24 horas
}
```

---

## ▶️ Como Executar Localmente

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

Endpoint utilizado pelo Render:

```
GET /health
```

Resposta esperada:

```json
{ "status": "ok" }
```

---

## 🎯 Endpoint Principal

### Gerar Quiz

```
POST /api/quiz
```

#### Body

```json
{
  "materia": "Matemática",
  "assunto": "Funções"
}
```

#### Resposta

```json
{
  "questoes": [ ... ]
}
```

---

## 🧠 Estratégia de Cache

- Verifica o MongoDB antes de chamar a IA
- Retorna quizzes existentes e válidos
- Gera novos quizzes apenas quando necessário
- Armazena com TTL para expiração automática

---

## 🚀 Deploy

- Backend hospedado no **Render**
- Banco de dados no **MongoDB Atlas**
- O Atlas é responsável apenas pelo banco, não pelo backend

---

## 👤 Usuários

- Usuários anônimos (fase inicial)
- Estrutura preparada para:
  - Autenticação
  - Sistema de score
  - Histórico de desempenho

---

## 📌 Próximos Passos

- Cadastro de usuários
- Autenticação (JWT / OAuth)
- Sistema de pontuação
- Rate limit por IP
- Documentação da API (Swagger / OpenAPI)

---

## 🧑‍💻 Autor

Projeto desenvolvido por **João Guilherme** 🚀

---

## 📄 Licença

Projeto de uso educacional e experimental.
