# 📝 MERN Task Manager

A full-stack **Task Manager application** built using the **MERN stack** with **JWT authentication**, **protected routes**, and complete **CRUD functionality**.

This project demonstrates real-world full-stack development including user authentication, authorization, API design, and frontend–backend integration.

---

## 🚀 Features

### 🔐 Authentication
- User Signup with auto-login
- User Login
- JWT-based authentication
- Protected routes (frontend + backend)
- Logout functionality

### ✅ Task Management
- Create tasks
- View user-specific tasks
- Mark tasks as completed
- Update task title/status
- Delete tasks

### 🎨 Frontend
- Built with React (Vite)
- Tailwind CSS for clean UI
- Axios for API calls
- Smooth UX (no unnecessary alerts)

### ⚙️ Backend
- Node.js + Express
- MongoDB with Mongoose
- JWT authentication
- Secure password hashing using bcrypt
- RESTful APIs

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcrypt

---

## 📂 Project Structure

mern-task-manager/
│
├── backend/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── config/
│ └── server.js
│
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ ├── services/
│ │ └── App.jsx
│ └── vite.config.js
│
└── README.md


---

## 🔑 API Endpoints

### Auth Routes
| Method | Endpoint | Description |
|------|---------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |

### Task Routes (Protected)
| Method | Endpoint | Description |
|------|---------|-------------|
| GET | `/api/tasks` | Get user tasks |
| POST | `/api/tasks` | Create task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |

---

## ⚙️ Environment Variables

Create a `.env` file inside `backend/`:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


---

## ▶️ How to Run Locally

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/mern-task-manager.git
cd mern-task-manager
2️⃣ Backend setup
cd backend
npm install
npm run dev
3️⃣ Frontend setup
cd frontend
npm install
npm run dev

Frontend will run at:
http://localhost:5173

Backend will run at:
http://localhost:5000
