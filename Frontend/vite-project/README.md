# React + Vite


 - Full Stack Blogging Platform
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

installation .................


cd backend 
npm i 
npm start
cd frontend 
cd vite-project
npm run dev














This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## tech stack used

tailwindcss
react router dom
shadcn ui-->(It is a collection of reusable, copy-paste React components built with Tailwind CSS and Radix UI.)button and input cmd npx shadcn@latest add card 
npm i lucid-react
npm i react-icons
Sonner is a toast notification system used to show small popup messages to users. npx shadcn@latest add sonner

login and signup loding==> import { Loader2 } from 'lucide-react'
react-redux-import { useDispatch, useSelector } from "react-redux" etc.
import { FaMoon, FaSun } from "react-icons/fa"==>light mode 

user consitent on web when refresh the page use --> npm i redux-persist

jodit-react for blog writing and editing 

import JoditEditor from 'jodit-react';=>npm i jodit-react


Make Frontend(UI)==>Backend(writelogic)==>defineroute(put post get)===>sendDatatoBackend(aixos Frontend)

 3:31