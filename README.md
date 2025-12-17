# 📚 Gabarita – Backend

API responsável pela geração, cache e entrega de quizzes educacionais (ENEM) utilizando **Node.js**, **Express**, **MongoDB Atlas** e a **API do Google Gemini**.

Este backend foi projetado para otimizar custos de requisição à IA, armazenando quizzes previamente gerados e reutilizando-os sempre que possível.

---

## 🏗️ Arquitetura da Aplicação

Fluxo principal de funcionamento da aplicação:

```
Front-end (Angular)
        ↓
Backend (Node.js + Express)
        ↓
Verifica se o quiz existe no MongoDB (cache)
        ↓
Se existir:
    → Retorna o quiz salvo
Se não existir:
    → Chama a API do Gemini
    → Salva o quiz no MongoDB
    → Retorna o quiz ao front-end
```

Esse fluxo garante:

* Menor custo de uso da API do Gemini
* Respostas mais rápidas
* Persistência de dados

---

## 🛠️ Tecnologias Utilizadas

* **Node.js**
* **Express**
* **MongoDB Atlas**
* **Mongoose**
* **Google Gemini API**
* **dotenv** (variáveis de ambiente)
* **CORS**
* **Render** (deploy do backend)

---

## 📂 Estrutura do Projeto

```
GABARITA-BACKEND
├── config
│   └── env.js
├── utils
│   └── gemini.js
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

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
PORT=3000
MONGODB_URI=mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/quizdb?retryWrites=true&w=majority
GEMINI_API_KEY=sua_chave_da_api_gemini
```

⚠️ **Nunca versionar o arquivo `.env`**

---

## ▶️ Como Executar o Projeto Localmente

1️⃣ Clone o repositório:

```bash
git clone https://github.com/seu-usuario/gabarita-backend.git
```

2️⃣ Instale as dependências:

```bash
npm install
```

3️⃣ Configure o arquivo `.env`

4️⃣ Inicie o servidor:

```bash
node server.js
```

Servidor rodando em:

```
http://localhost:3000
```

---

## 🔎 Health Check

Endpoint utilizado para monitoramento e deploy (Render):

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

#### Body:

```json
{
  "materia": "Matemática",
  "assunto": "Funções"
}
```

#### Resposta:

```json
{
  "questoes": [ ... ]
}
```

---

## 🧠 Estratégia de Cache

* Antes de chamar a API do Gemini, o backend verifica se o quiz já existe no MongoDB
* Caso exista, o quiz é retornado imediatamente
* Caso não exista, o Gemini é acionado, o quiz é salvo no banco e retornado

Essa estratégia reduz significativamente o consumo de quotas da API de IA.

---

## 👤 Usuários

* A aplicação suporta **usuários anônimos** inicialmente
* A arquitetura está preparada para futura implementação de:

  * Cadastro de usuários
  * Autenticação
  * Sistema de pontuação (score)

---

## 🚀 Deploy

* Backend hospedado no **Render**
* Banco de dados no **MongoDB Atlas**

O MongoDB Atlas **não hospeda o backend**, apenas o banco de dados.

---

## 📌 Próximos Passos

* Criar collection de quizzes (cache)
* Criar collection de usuários
* Implementar sistema de score
* Autenticação (JWT ou OAuth)
* Documentação da API (Swagger / OpenAPI)

---

## 🧑‍💻 Autor

Projeto desenvolvido por **João Guilherme** 🚀

---

## 📄 Licença

Este projeto é de uso educacional e experimental.
