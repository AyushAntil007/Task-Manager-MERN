# 🚀 Full Stack Task Manager (MERN)

A scalable full-stack application with **JWT authentication, role-based access control, and CRUD operations**.
Built as part of a backend developer assignment.

Keypoint: I documented all APIs using Postman and exported the collection for easy testing and sharing.

---

# 📌 Features

## 🔐 Authentication

* User Registration
* User Login
* Password hashing using bcrypt
* JWT-based authentication

## 🛡️ Authorization

* Role-based access control (User vs Admin)
* Admin can delete any task
* Users can only manage their own tasks

## 📦 Task Management

* Create Task
* Read Tasks
* Update Task
* Delete Task (Admin only)

## 👑 Admin Features

* View all users' tasks
* Tasks grouped by user
* Delete any task

## 🧑 User Features

* Add tasks
* View own tasks
* Update own tasks

---

# 🛠️ Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT (Authentication)
* bcrypt (Password hashing)

### Frontend

* React.js (Vite)
* Axios
* React Router

---

# 📁 Project Structure

```
task-manager/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── roleMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   │
│   ├── .env
│   ├── .gitignore
│   ├── app.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── .gitignore
│   ├── package.json
│   └── vite.config.js
│
├── README.md
└── .gitignore  
```

---

# ⚙️ Setup Instructions

## 1️⃣ Clone Repository

```bash
git clone https://github.com/AyushAntil007/Task-Manager-MERN.git
cd project-folder
```

---

## 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mydatabase
JWT_SECRET=your_super_secret_key
```

Run backend:

```bash
npm run dev
```

---

## 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Open in browser:

```
http://localhost:5173
```

---

# 🔐 Authentication Flow

```
Register → Login → Receive JWT → Store Token → Access Protected Routes
```

JWT is stored in:

```
localStorage
```

---

# 📡 API Endpoints

## 🔐 Auth Routes

### Register

```
POST /api/auth/register
```

Body:

```json
{
  "name": "Ayush",
  "email": "user@test.com",
  "password": "123456"
}
```

---

### Login

```
POST /api/auth/login
```

Response:

```json
{
  "token": "JWT_TOKEN"
}
```

---

## 📦 Task Routes (Protected)

### Create Task

```
POST /api/tasks
```

---

### Get Tasks

```
GET /api/tasks
```

* User → own tasks
* Admin → all tasks

---

### Update Task

```
PUT /api/tasks/:id
```

---

### Delete Task (Admin Only)

```
DELETE /api/tasks/:id
```

---

# 🔑 Role-Based Logic

| Role  | Permissions                     |
| ----- | ------------------------------- |
| User  | Create, Read, Update own tasks  |
| Admin | Read all tasks, Delete any task |

---

# 👑 Admin Logic

* If email ends with `@admin.com` → role = admin
* Admin sees:

  * Grouped tasks by user
  * Delete option

---

# 🧪 Testing

## Manual Testing (Postman)

1. Register user
2. Login → get token
3. Add token in headers:

```
Authorization: Bearer <token>
```

4. Test all CRUD APIs

---

# 📊 Scalability Notes

* Modular architecture (controllers, routes, middleware)
* Easy to extend into microservices
* JWT-based stateless authentication
* Can integrate:

  * Redis (caching)
  * Docker (deployment)
  * Load balancing

---

# 💡 Future Improvements

* Refresh tokens
* Pagination & filtering
* File upload support
* UI improvements
* Admin dashboard enhancements

---

# 🧠 Learnings

* Implemented secure authentication using JWT
* Applied role-based access control
* Built scalable backend architecture
* Integrated frontend with protected APIs

---

# 🙌 Author

Ayush Antil

---

# ⭐ Notes

* Backend and frontend must run simultaneously
* Ensure MongoDB is running locally
* Use correct `.env` configuration
