# 🏡 Property Management Platform

A full-stack real estate web application for managing property listings, users, and agent workflows. Built with a modern frontend stack and a Node.js backend.

---

## 📁 Project Structure

```
real_estate_app/
├── dist/               # Production build
├── node_modules/      # Dependencies
├── public/            # Static assets
├── server/            # Backend (Node.js / Express)
├── src/               # Frontend source (Vite)
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── test.js
└── vite.config.js
```

---

## ⚙️ Prerequisites

Install the following before running the project:

* Node.js (v18 or higher recommended)
* npm (comes with Node.js)
* Git

Check versions:

```bash
git --version
node -v
npm -v
```

---

## ⬇️ Clone Repository

```bash
git clone https://github.com/SaadKhawer/real-estate-digital-platform.git
cd real-estate-digital-platform
```

---

## 📦 Install Dependencies

Run in root folder:

```bash
npm install
```

If backend has separate dependencies:

```bash
cd server
npm install
cd ..
```

---

## ▶️ Run Project (Development)

### Start frontend (Vite):

```bash
npm run dev
```

### Start backend (if separate server exists):

```bash
cd server
npm run dev
```

---

## 🏗️ Build for Production

```bash
npm run build
```

Preview build:

```bash
npm run preview
```

---

## 🔐 Environment Variables (if needed)

Create a `.env` file in root or server folder:

```
PORT=5000
MONGO_URI=your_database_url
JWT_SECRET=your_secret_key
```

---

## 🚀 Features

* Property listing system
* User authentication
* Agent workflow management
* Backend API integration
* Scalable folder structure

---

## 🧠 Tech Stack

Frontend:

* Vite
* JavaScript / HTML / CSS

Backend:

* Node.js
* Express.js

---

## 🧩 Common Commands

| Command         | Description              |
| --------------- | ------------------------ |
| npm install     | Install dependencies     |
| npm run dev     | Run frontend dev server  |
| npm run build   | Create production build  |
| npm run preview | Preview production build |

---

## ❗ Notes

* Do not upload `node_modules`
* Ensure `.env` is in `.gitignore`
* Use separate terminals for frontend and backend

---

## 📄 License

This project is for educational and portfolio purposes.


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
