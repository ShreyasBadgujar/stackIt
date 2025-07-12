
# 📚 stackIt

A full-stack Question & Answer platform inspired by Stack Overflow, built with the MERN stack (MongoDB, Express.js, React.js, Node.js). Users can post questions, answer others, and engage in a knowledge-sharing community.

---

## 🛠 Tech Stack

### 🔙 Backend

* **Node.js**
* **Express.js**
* **MongoDB** with **Mongoose ODM**
* **JWT** for authentication
* **bcrypt** for password hashing
* **dotenv** for environment config
* **CORS**
* **Morgan** for HTTP logging

### 🔜 Frontend

* **React.js**
* **React Router DOM**
* **Axios** for API calls
* **Tailwind CSS** / CSS Modules for styling
* **Redux Toolkit** (if used for state management)

---

## 📂 Project Structure

### 📦 Backend (`/`)

```
stackIt/
├── controllers/       # Logic for handling routes
├── models/            # Mongoose schemas (User, Question, Answer, etc.)
├── routes/            # API route definitions
├── middleware/        # Auth middleware, error handlers
├── config/            # DB connection and environment setup
├── .env               # Environment variables (e.g., PORT, DB_URI)
├── index.js           # Entry point of the app
├── package.json       # Project dependencies and scripts
└── README.md          # You're reading it :)
```

### 🖥 Frontend (`/client`)

```
client/
├── public/            # Static files and HTML
├── src/
│   ├── assets/        # Images, icons, etc.
│   ├── components/    # Reusable components (NavBar, Button, etc.)
│   ├── pages/         # Page-level components (Home, Login, Signup, AskQuestion, etc.)
│   ├── services/      # API interaction (Axios instances)
│   ├── redux/         # Store and slices (if Redux is used)
│   ├── App.js         # Main component
│   ├── index.js       # ReactDOM render
│   └── styles/        # Tailwind config or CSS files
├── package.json       # React dependencies and scripts
└── .env               # Frontend env variables
```

---

## 🔐 Features

* ✅ JWT-based login/signup
* ✅ Role-based access (user/admin if needed)
* ✅ Post and edit questions
* ✅ Post answers
* ✅ Upvote/downvote system (if implemented)
* ✅ Profile and dashboard view
* ✅ RESTful APIs
* ✅ Secure password hashing with bcrypt

---

## 🚀 Getting Started

### 📦 Backend Setup

```bash
git clone https://github.com/ShreyasBadgujar/stackIt.git
cd backend
npm install
cp .env.example .env  # Add your PORT and MongoDB URI
npm run dev
```

### 🖥 Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 🌐 API Endpoints (Short Overview)

### Auth

* `POST /api/auth/signup` – Register user
* `POST /api/auth/login` – Login and receive JWT

### Questions

* `POST /api/questions/` – Ask a new question
* `GET /api/questions/` – Get all questions
* `GET /api/questions/:id` – Get single question
* `DELETE /api/questions/:id` – Delete a question

### Answers

* `POST /api/answers/:questionId` – Add answer
* `GET /api/answers/:questionId` – Get answers for a question

*(More endpoints as per your implementation)*

---

## 🧪 Future Improvements

* Comment system on answers
* Rich text editor for questions/answers
* Tag-based search and filtering
* Notification system
* Admin dashboard
* Dark mode toggle

