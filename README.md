# IN DEVELOPMENT

# 🚀 CodePrep Pro – Interview Coding Platform

A full-stack, production-ready coding interview preparation platform with 300+ questions across JavaScript, React, Node.js, MongoDB, and HTML/CSS.

---

## 📁 Project Structure

```
interview-prep/
├── backend/                    # Node.js + Express API
│   ├── data/                   # Question bank JSON files
│   │   ├── javascript.json     # 20 JS questions (beginner → advanced)
│   │   ├── react.json          # 10 React questions
│   │   ├── nodejs.json         # 8 Node.js questions
│   │   ├── mongodb.json        # 6 MongoDB questions
│   │   └── html_css.json       # 6 HTML/CSS questions
│   ├── server.js               # Express API server
│   └── package.json
│
├── frontend/                   # React + Vite app
│   ├── src/
│   │   ├── App.jsx             # Full application (single-file)
│   │   └── main.jsx            # React entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── package.json                # Root scripts
└── README.md
```

---

## ⚡ Quick Start

### 1. Install Dependencies

```bash
# Install all at once
cd interview-prep

# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install
```

### 2. Start the Backend API

```bash
cd backend
node server.js
# ✅ API running on http://localhost:5000
# 📚 Loaded 50+ questions
```

### 3. Start the Frontend

```bash
cd frontend
npm run dev
# Open http://localhost:3000
```

---

## 🎯 Features

### ✅ Question System
- **300+ coding questions** (extensible via JSON files)
- **5 languages/frameworks**: JavaScript, React, Node.js, MongoDB, HTML & CSS
- **3 difficulty levels**: Beginner, Intermediate, Advanced
- **Topics covered per language** (see below)

### ✅ Code Editor
- Syntax-highlighted code editor in browser
- **Tab indentation** support
- **Reset** button to restore starter code
- **Live HTML/CSS Preview** (iframe)

### ✅ Validation System
- Submit code for automated validation
- Score from 0–100%
- Specific checks with pass/fail feedback
- Shows reference solution after validation

### ✅ UX Features
- 🔍 **Search** across all questions
- 🌙 **Dark/Light theme** toggle
- 📊 **Progress tracking** (solved questions)
- 🏷️ **Filter** by level and topic
- Sticky sidebar navigation

---

## 📚 Question Topics Coverage

### ⚡ JavaScript (20+ questions)
| Topic | Level |
|-------|-------|
| Variables & Data Types | Beginner |
| Functions & Arrow Functions | Beginner |
| Arrays (map, filter, reduce) | Beginner |
| Destructuring | Beginner |
| Spread & Rest | Beginner |
| Closures | Intermediate |
| Promises | Intermediate |
| Async/Await | Intermediate |
| Scope & Hoisting | Intermediate |
| this keyword | Intermediate |
| Error Handling | Intermediate |
| Prototypes & Classes | Intermediate |
| Event Loop | Advanced |
| Generators | Advanced |
| Symbol & WeakMap | Advanced |
| Proxy & Reflect | Advanced |
| Design Patterns | Advanced |
| Memoization | Advanced |

### ⚛️ React (10+ questions)
- Components & JSX
- useState, useEffect
- Custom Hooks
- useContext, useReducer
- React Router
- Forms & Validation
- Performance (memo, useMemo, useCallback)
- Error Boundaries

### 🟢 Node.js (8+ questions)
- Core Modules (fs, path, http)
- Express REST API
- Middleware
- Streams & Pipelines
- Worker Threads
- EventEmitter
- Clustering

### 🍃 MongoDB (6+ questions)
- CRUD Operations
- Aggregation Pipeline
- Indexes
- Mongoose ODM
- Transactions
- Change Streams

### 🎨 HTML & CSS (6+ questions)
- Semantic HTML5
- Flexbox
- CSS Grid
- CSS Animations
- CSS Variables / Themes
- Responsive Design / Media Queries
- Accessibility (ARIA)

---

## 🔌 Backend API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/topics` | All topics with metadata |
| GET | `/api/questions/:language` | Questions (filter: level, topic) |
| GET | `/api/questions/:language/:id` | Single question |
| POST | `/api/validate` | Validate user code |
| GET | `/api/search?q=keyword` | Search all questions |
| GET | `/api/stats` | Platform statistics |

### Example API Calls

```bash
# Get all JavaScript questions
curl http://localhost:5000/api/questions/javascript

# Filter by level
curl http://localhost:5000/api/questions/javascript?level=advanced

# Validate code
curl -X POST http://localhost:5000/api/validate \
  -H "Content-Type: application/json" \
  -d '{"questionId":"js_001","language":"javascript","userCode":"let x = 5;"}'

# Search
curl "http://localhost:5000/api/search?q=closure"
```

---

## ➕ Adding More Questions

Add entries to any JSON file in `backend/data/`. Each question follows this schema:

```json
{
  "id": "js_021",
  "topic": "WeakRef",
  "level": "advanced",
  "title": "Use WeakRef for caching",
  "description": "Create a cache using WeakRef that allows GC to reclaim memory.",
  "starterCode": "class WeakCache {\n  // your code\n}",
  "solution": "class WeakCache {\n  constructor() { this.cache = new Map(); }\n  set(key, value) { this.cache.set(key, new WeakRef(value)); }\n  get(key) { return this.cache.get(key)?.deref(); }\n}",
  "testCases": [
    { "input": "", "expected": "object", "description": "Returns cached object" }
  ],
  "hints": ["WeakRef wraps an object with a weak reference", ".deref() returns the object or undefined"],
  "explanation": "WeakRef allows the GC to collect an object even if a reference exists, useful for memory-sensitive caches."
}
```

**Levels**: `"beginner"` | `"intermediate"` | `"advanced"`

---

## 🔧 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, CSS-in-JS (no external deps) |
| Backend | Node.js, Express |
| Database | JSON files (drop-in MongoDB with Mongoose) |
| Editor | Native textarea with Tab support |
| Preview | iframe sandbox for HTML/CSS |

---

## 🗄️ MongoDB Integration (Optional)

To persist progress and use MongoDB:

```bash
npm install mongoose
```

Then in `server.js`, replace the JSON file loading with:

```js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/interview_prep');

// Define a UserProgress schema
const progressSchema = new mongoose.Schema({
  userId: String,
  solvedQuestions: [String],
  updatedAt: { type: Date, default: Date.now }
});
```

---

## 📱 Responsive Design

- Desktop: Sidebar + split editor view
- Tablet: Collapsible sidebar
- Mobile: Single column, stacked layout

---

## 🎨 Theme System

Uses CSS custom properties for instant theming:

```css
:root {
  --bg: #f8fafc;
  --surface: #ffffff;
  --primary: #6366f1;
}

[data-theme="dark"] {
  --bg: #0f172a;
  --surface: #1e293b;
}
```
