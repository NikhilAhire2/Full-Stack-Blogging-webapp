# React + Vite

# - Full Stack Blogging Platform
📖 Overview

 is a modern full-stack blogging platform built using the MERN Stack. It allows users to create, read, update, and delete blog posts while providing a clean and responsive user interface. The application uses Redux Toolkit for state management, ShadCN UI for modern UI components, and MongoDB for data storage.

Users can register, log in, manage their profiles, publish blogs, edit existing posts, and explore content created by other users.

🚀 Features
User Features
User Registration & Login
JWT Authentication
Create Blog Posts
Read Blogs
Update Blogs
Delete Blogs
User Profile Management
Responsive Design
Search Functionality
Protected Routes
Admin Features
Manage Users
Manage Blog Posts
Dashboard Overview
Technical Features
REST API Architecture
Redux Toolkit State Management
MongoDB Database Integration
Express.js Backend
React Router Navigation
CRUD Operations
Responsive UI with ShadCN UI
Axios API Integration

🛠️ Tech Stack
Frontend
React.js
Redux Toolkit
React Router DOM
Axios
ShadCN UI
Tailwind CSS
Backend
Node.js
Express.js
JWT Authentication
bcrypt.js
Database
MongoDB
Mongoose


Note db note working due env not pushing to the git some problem i have taken secret here

# installation .................


cd backend 
npm i 
npm start
cd frontend 
cd vite-project
npm run dev



Technologies Used
Frontend
React.js
Axios
Redux
Tailwind CSS
Backend
Node.js
Express.js
Database
MongoDB
Mongoose
AI Layer
Google Gemini API
Gemini 2.5 Flash Model


# Aritechture Overview

┌─────────────────────────┐
│       React Frontend    │
│                         │
│ • Blog View Page        │
│ • Chat UI               │
│ • Ask Question Button   │
└───────────┬─────────────┘
            │
            │ Axios POST
            │ { blogId, question }
            ▼
┌─────────────────────────┐
│     Express Backend     │
│                         │
│ Route: /api/v1/blog/    │
│        ask-blog         │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│      Controller         │
│ askBlogQuestion()       │
│                         │
│ 1. Receive blogId       │
│ 2. Receive question     │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│       MongoDB           │
│                         │
│ Blog Collection         │
│                         │
│ Find Blog By ID         │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│ Content Processing      │
│                         │
│ Remove HTML Tags        │
│ Clean Blog Content      │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│     Gemini Service      │
│      (gemini.js)        │
│                         │
│ Build Prompt            │
│ Add Blog Content        │
│ Add User Question       │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│ Google Gemini API       │
│ Gemini 2.5 Flash        │
│                         │
│ Generates Answer        │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│     Express Backend     │
│                         │
│ Return JSON Response    │
│ { answer }              │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│      React Frontend     │
│                         │
│ Display AI Response     │
│ in Chat Interface       │
└─────────────────────────┘


User asks question
        ↓
React sends blogId + question
        ↓
Express API receives request
        ↓
MongoDB fetches blog content
        ↓
HTML content cleaned
        ↓
Prompt created
        ↓
Gemini API called
        ↓
Answer generated
        ↓
Backend sends answer
        ↓
React displays answer


I implemented an AI-powered "Chat With Blog" feature using Google Gemini API. When a user asks a question, the React frontend sends the blog ID and question to the Express backend. The backend fetches the blog content from MongoDB, removes HTML tags, and constructs a prompt containing the blog text and user query. This prompt is sent to Gemini 2.5 Flash through Google's SDK. Gemini generates a context-aware response based only on the blog content. The answer is then returned to the frontend and displayed in a chat-style interface. This architecture keeps the API key secure, reduces payload size, and improves performance.



Why Send Blog ID Instead of Blog Content?

Short Interview Answer:

I send only the blog ID from the frontend instead of the entire blog content because it reduces the request size and improves performance. The backend fetches the blog content directly from MongoDB using the ID, which is more secure, efficient, and follows a proper client-server architecture.


Example

❌ Sending full content:

{
  blogContent: "5000 words blog text...",
  question: "What is EC2?"
}

✅ Sending only ID:

{
  blogId: "687abc123",
  question: "What is EC2?"
}


Benefits
Smaller API payload
Faster requests
More secure
Avoids sending large data repeatedly
Backend remains the single source of truth


How I Maintain Chat History (Short Interview Answer)

I maintain chat history on the frontend using React state. Every time the user asks a question and Gemini returns an answer, I store both the question and answer in a messages array. This array is displayed in a chat-style UI and is also sent to the backend with future questions so Gemini can understand the conversation context.

Example
const [messages, setMessages] = useState([]);

You can mention:

AI Summary Generation
Multi-language Translation
Voice Questions
Chat History Storage
Vector Search / RAG for very large blogs
Personalized Recommendations


## tech stack used

Frontend
React Router DOM → Routing between pages.

TailwindCSS → Utility-first CSS framework for styling.

Shadcn UI → Prebuilt, customizable components (button, input, card, sonner for toast notifications).

Lucide React → Icon library (e.g., Loader2 for loading states).

React Icons → Additional icons (FaMoon, FaSun for light/dark mode).

Sonner → Toast notification system.

Jodit React → Rich text editor for blog writing.

State Management
React Redux → Global state management (useDispatch, useSelector).

Redux Persist → Keeps user state consistent across page refreshes.

Backend
Node.js + Express.js → REST API with routes (GET, POST, PUT).

MongoDB → Database for storing users, blogs, and other data.

Axios → Handles API requests from frontend to backend.
 

install localy

npm i
npm i react-router-dom tailwindcss
npx shadcn@latest add card
npm i lucide-react react-icons
npx shadcn@latest add sonner
npm i react-redux redux-persist
npm i jodit-react

# folder Sturcture

project/
│── frontend/
│   ├── src/
│   │   ├── components/   # UI components (Button, Input, Card)
│   │   ├── pages/        # Login, Signup, Dashboard, BlogEditor
│   │   ├── redux/        # Store, reducers, actions
│   │   ├── App.js        # Routes setup
│   │   └── index.js      # Entry point
│── backend/
│   ├── routes/           # API routes (auth, blog)
│   ├── models/           # MongoDB schemas
│   ├── controllers/      # Business logic
│   ├── server.js         # Express app entry
│── README.md
