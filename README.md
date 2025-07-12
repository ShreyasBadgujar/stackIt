📚 StackIt – Minimal Q\&A Forum Platform (Backend)

StackIt is a backend application for a minimalistic Q\&A (Question & Answer) platform designed to support collaborative learning and structured community knowledge sharing. It provides RESTful APIs for user management, question/answer functionality, voting, notifications, and admin moderation.

🚀 Features

✅ User Authentication (JWT-based login/signup)
✅ Role-based Access Control (User, Admin, Banned)
✅ CRUD Operations for Questions & Answers
✅ Voting System (Upvote/Downvote Answers)
✅ Accept Answers Feature (by question owner)
✅ Notification System (for answers, mentions)
✅ MongoDB Database Integration with Mongoose ODM
✅ Middleware for Authentication and Access Control

🛠 Tech Stack

* Backend: Node.js, Express.js
* Database: MongoDB (Mongoose ODM)
* Authentication: JWT (JSON Web Token)
* Middleware: Express, bcrypt for password hashing
* Utility: dotenv, CORS, Morgan (logging)

📂 Project Structure

stackIt/
├── controllers/       
├── models/            
├── routes/            
├── middleware/        
├── config/            
├── .env              
├── index.js           
├── package.json       
└── README.md          

🛠 Setup & Installation

1️⃣ Clone the Repository

git clone [https://github.com/ShreyasBadgujar/stackIt.git](https://github.com/ShreyasBadgujar/stackIt.git)
cd stackIt

2️⃣ Install Dependencies

npm install

3️⃣ Configure Environment Variables

Create a .env file in the root directory and add the following:

PORT=5000
MONGO\_URI=your\_mongodb\_connection\_string
JWT\_SECRET=your\_jwt\_secret\_key

4️⃣ Run the Server

npm run dev

The server will start at [http://localhost:5000](http://localhost:5000)

🔗 API Endpoints

🧑 Auth

| Method | Endpoint           | Description             | Auth Required |
| ------ | ------------------ | ----------------------- | ------------- |
| POST   | /api/auth/register | Register a new user     | ❌             |
| POST   | /api/auth/login    | Login and get JWT token | ❌             |

📚 Questions

| Method | Endpoint            | Description          | Auth Required |
| ------ | ------------------- | -------------------- | ------------- |
| GET    | /api/questions      | Get all questions    | ❌             |
| POST   | /api/questions      | Create a question    | ✅             |
| DELETE | /api/questions/\:id | Delete your question | ✅             |

💬 Answers

| Method | Endpoint                       | Description                | Auth Required |
| ------ | ------------------------------ | -------------------------- | ------------- |
| GET    | /api/answers/\:questionId      | Get answers for a question | ❌             |
| POST   | /api/answers/\:questionId      | Post an answer             | ✅             |
| DELETE | /api/answers/delete/\:id       | Delete your answer         | ✅             |
| PATCH  | /api/answers/\:answerId/vote   | Upvote/Downvote an answer  | ✅             |
| PATCH  | /api/answers/\:answerId/accept | Mark answer as accepted    | ✅             |

🔔 Notifications

| Method | Endpoint           | Description                  | Auth Required |
| ------ | ------------------ | ---------------------------- | ------------- |
| GET    | /api/notifications | Get notifications for a user | ✅             |

🛡 Security & Best Practices

✔ Passwords hashed securely with bcrypt
✔ JWT-based authentication for protected routes
✔ Role-based authorization (admin, user, banned)
✔ Request validation & error handling
✔ MongoDB index usage & population for references
