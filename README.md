## In Development


# 🚀 CodeCraft Hub

> **A full-stack Programming Skills and Interview Readiness Platform** — built to help developers sharpen their coding skills, practice data structures & algorithms, and prepare confidently for technical interviews.

---

## 📌 Project Status

> ⚠️ **This project is currently under active development.** Features and documentation will be updated as the project progresses.

---

## 📖 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

---

## 🧠 About

**CodeCraft Hub** is an interview-readiness and programming skills platform designed for developers at all levels. Whether you're preparing for FAANG-level interviews or brushing up on fundamentals, CodeCraft Hub provides a structured environment to practice, track progress, and improve.

---

## ✨ Features

- 📚 Curated coding challenges and problem sets
- 🧩 Practice tracks for DSA, system design, and more
- 💻 Interactive coding environment
- 🧪 Real-time code evaluation
- 📊 Progress tracking dashboard
- 🔐 User authentication and profile management

---

## 🛠 Tech Stack

| Layer     | Technology              |
|-----------|-------------------------|
| Frontend  | JavaScript (React / Vite) |
| Backend   | Node.js / Express       |
| Language  | JavaScript (99%+)       |
| Package Management | npm / concurrently |

---

## 📁 Project Structure

```
CodeCraft-Hub/
├── backend/          # Node.js/Express API server
├── frontend/         # React/Vite client application
├── package.json      # Root-level scripts for running both together
├── .gitignore
├── LICENSE
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/sivaprasath2004/CodeCraft-Hub.git
   cd CodeCraft-Hub
   ```

2. **Install all dependencies** (frontend + backend at once)

   ```bash
   npm run install:all
   ```

   Or install them separately:

   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

3. **Set up environment variables**

   Create `.env` files in both `backend/` and `frontend/` as needed. Refer to any `.env.example` files inside those directories for the required variables.

---

## 📜 Scripts

Run these from the **root** directory:

| Script | Description |
|--------|-------------|
| `npm run install:all` | Install dependencies for both frontend and backend |
| `npm run dev` | Run both frontend and backend concurrently in development mode |
| `npm run dev:backend` | Run only the backend server |
| `npm run dev:frontend` | Run only the frontend dev server |

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m 'Add some feature'`
4. Push to your branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please make sure your code follows the existing style and that any new features are documented.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 👤 Author

**Sivaprasath**  
GitHub: [@sivaprasath2004](https://github.com/sivaprasath2004)

---

> 💡 *"The best way to get ready for a coding interview is to actually code."* — CodeCraft Hub
