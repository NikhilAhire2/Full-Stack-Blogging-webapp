# Full Stack Blogging Platform

> A modern **AI-powered Full Stack Blogging Platform** built with the **MERN Stack** following the **MVC Architecture**. The application enables users to create, manage, and explore blogs with secure authentication, role-based authorization, and AI-powered blog assistance using **Google Gemini 2.5 Flash**.

---

# 📖 Overview

This project is a production-ready blogging platform developed using **MongoDB, Express.js, React.js, Node.js, Redux Toolkit, TailwindCSS, and ShadCN UI**.

The platform provides secure authentication, blog management, profile management, commenting, and AI-powered blog interaction.

Users can:

* Register & Login
* Create Blogs
* Edit/Delete Blogs
* Read Blogs
* Comment on Blogs
* Manage Profile
* Search Blogs
* Translate Blogs
* Generate AI Blog Summaries
* Chat with Blogs using Google Gemini

The application follows a clean **MVC Architecture** with reusable frontend components and RESTful APIs.

---

# ✨ Features

## 👤 User Features

* User Registration
* Secure Login & Logout
* JWT Authentication
* OAuth Login (Google)
* Protected Routes
* Role-Based Authorization
* Profile Management
* Create Blog
* Edit Blog
* Delete Blog
* Read Blogs
* Comment System
* Search Blogs
* Responsive UI
* Dark / Light Theme

---

## 🤖 AI Features

### AI Blog Chat

Ask questions about any blog.

Example:

> "What is AWS EC2?"

The AI reads only that blog and generates an answer.

---

### AI Blog Summarization

Generate concise summaries of lengthy blog posts.

---

### AI Blog Translation

Translate blog content into multiple languages using Google Gemini.

---

### Chat History

Maintains previous conversation context for better AI responses.

---

## 🔒 Authentication

* JWT Authentication
* Google OAuth Login
* Protected Routes
* Authorization Middleware
* Secure Password Hashing (bcrypt)

---

## 🛠 Admin Features

* Manage Users
* Manage Blogs
* Delete Inappropriate Content
* Dashboard Overview

---

# 🏗 Architecture

```
React Frontend
        │
        ▼
Axios REST API
        │
        ▼
Express Backend
        │
Controllers
        │
Models
        │
MongoDB
```

Architecture Pattern

```
MVC Architecture

Frontend
     │
 REST APIs
     │
Controllers
     │
Models
     │
MongoDB
```

---

# 🤖 AI Workflow

```
User asks question
        │
        ▼
React Frontend
        │
        ▼
Axios POST Request
        │
        ▼
Express API
        │
        ▼
Find Blog by ID
        │
        ▼
Remove HTML Tags
        │
        ▼
Build Prompt
        │
        ▼
Google Gemini 2.5 Flash
        │
        ▼
Generate Answer
        │
        ▼
Return JSON
        │
        ▼
React Chat Interface
```

---

# Why Send Blog ID Instead of Blog Content?

Instead of sending the complete blog content from the frontend, only the **Blog ID** is sent.

Example

### ❌ Bad

```json
{
  "blogContent":"5000 words...",
  "question":"Explain EC2"
}
```

### ✅ Good

```json
{
  "blogId":"687abc123",
  "question":"Explain EC2"
}
```

### Benefits

* Smaller API Payload
* Faster Requests
* More Secure
* Better Performance
* Backend is the Single Source of Truth

---

# Chat History Flow

```
Question
      │
      ▼
Gemini Response
      │
      ▼
Store in React State
      │
      ▼
Send Previous Messages
      │
      ▼
Better Context
```

---

# 🛠 Tech Stack

## Frontend

* React.js
* Vite
* Redux Toolkit
* React Router DOM
* Axios
* TailwindCSS
* ShadCN UI
* Framer Motion
* Jodit React Editor
* Sonner Toast
* Lucide React
* React Icons

---

## Backend

* Node.js
* Express.js
* JWT
* bcrypt.js
* Cloudinary
* Multer
* Google OAuth

---

## Database

* MongoDB
* Mongoose

---

## AI Layer

* Google Gemini API
* Gemini 2.5 Flash

---

## Development Tools

* Git
* GitHub
* VS Code
* Postman
* Thunder Client

---

# 📂 Project Structure

```
MERN_1
│
├── Backend
│   ├── controllers
│   ├── Database
│   ├── Models
│   ├── routes
│   ├── utils
│   ├── server.js
│   └── package.json
│
├── Frontend
│   └── vite-project
│       ├── src
│       │   ├── assets
│       │   ├── components
│       │   ├── Pages
│       │   ├── redux
│       │   ├── context
│       │   ├── lib
│       │   └── App.jsx
│       │
│       ├── public
│       └── package.json
│
└── README.md
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/Blogging-Platform.git
```

---

## Backend Setup

```bash
cd Backend

npm install

npm start
```

---

## Frontend Setup

```bash
cd Frontend

cd vite-project

npm install

npm run dev
```

---

# Environment Variables

Create a `.env` file inside the Backend folder.

Example

```env
PORT=

MONGODB_URI=

JWT_SECRET=

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=

GOOGLE_CLIENT_ID=

GOOGLE_CLIENT_SECRET=

GEMINI_API_KEY=
```

> **Note:** The `.env` file is intentionally excluded from GitHub for security reasons. Add your own credentials before running the project.

---

# REST APIs

Authentication

```
POST /api/v1/user/register

POST /api/v1/user/login

POST /api/v1/auth/google
```

Blogs

```
GET /api/v1/blog

POST /api/v1/blog/create

PUT /api/v1/blog/:id

DELETE /api/v1/blog/:id
```

Comments

```
POST /api/v1/comment

GET /api/v1/comment/:id
```

AI

```
POST /api/v1/blog/ask-blog

POST /api/v1/blog/summarize

POST /api/v1/blog/translate
```

---

# Security Features

* JWT Authentication
* Role-Based Access Control
* Password Hashing using bcrypt
* Protected Routes
* Secure API Design
* Environment Variables
* API Key Protection

---

# Future Improvements

* AI Blog Recommendation
* Voice-based Questions
* AI Tag Generation
* RAG-based Blog Search
* Vector Database Integration
* Multi-language UI
* Bookmark Blogs
* Real-time Notifications
* Like & Share System

---

# Learning Highlights

* MERN Stack Development
* MVC Architecture
* REST API Development
* JWT Authentication
* Google OAuth
* Redux Toolkit
* AI Integration using Google Gemini
* Prompt Engineering
* Responsive UI Design
* API Testing
* Git & GitHub Workflow

---

# API Testing

The project APIs were tested using:

* Postman
* Thunder Client

---

# License

This project is developed for learning, portfolio, and educational purposes.

---

## ⭐ If you found this project helpful, consider giving it a Star on GitHub!
