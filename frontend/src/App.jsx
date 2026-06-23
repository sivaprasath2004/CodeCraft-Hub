import { useState, useEffect, createContext, useContext } from "react";

// ============================================================
// CONTEXT
// ============================================================
const AppContext = createContext();
export const useApp = () => useContext(AppContext);

const API = "http://localhost:5000/api";

// ============================================================
// ICONS (inline SVG)
// ============================================================
const Icon = {
  Code: () => (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  Check: () => (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  X: () => (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  Search: () => (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  Sun: () => (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    </svg>
  ),
  Moon: () => (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  ),
  ChevronRight: () => (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  ),
  Play: () => (
    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
      <polygon points="5 3 19 12 5 21 5 3"/>
    </svg>
  ),
  Eye: () => (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  Lightbulb: () => (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M9 21h6M12 3a6 6 0 0 1 6 6c0 3-2 5-3 6H9c-1-1-3-3-3-6a6 6 0 0 1 6-6z"/>
    </svg>
  ),
  Trophy: () => (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <polyline points="8 21 12 17 16 21"/>
      <path d="M5 3H3v4a4 4 0 0 0 4 4h0M19 3h2v4a4 4 0 0 1-4 4h0"/>
      <rect x="7" y="3" width="10" height="10" rx="1"/>
      <line x1="12" y1="17" x2="12" y2="13"/>
    </svg>
  ),
  Refresh: () => (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <polyline points="23 4 23 10 17 10"/>
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
    </svg>
  ),
};

// ============================================================
// THEME & COLORS
// ============================================================
const LANG_CONFIG = {
  javascript: { color: "#f7df1e", bg: "#1a1a00", label: "JavaScript", emoji: "⚡" },
  react: { color: "#61dafb", bg: "#001a1f", label: "React", emoji: "⚛️" },
  nodejs: { color: "#68a063", bg: "#001a00", label: "Node.js", emoji: "🟢" },
  mongodb: { color: "#47a248", bg: "#001200", label: "MongoDB", emoji: "🍃" },
  html_css: { color: "#e44d26", bg: "#1a0500", label: "HTML & CSS", emoji: "🎨" },
};

const LEVEL_COLORS = {
  beginner: "#22c55e",
  intermediate: "#f59e0b",
  advanced: "#ef4444",
};

// ============================================================
// STYLES
// ============================================================
const getStyles = (dark) => `
  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: ${dark ? "#0f172a" : "#f8fafc"};
    --surface: ${dark ? "#1e293b" : "#ffffff"};
    --surface2: ${dark ? "#263148" : "#f1f5f9"};
    --border: ${dark ? "#334155" : "#e2e8f0"};
    --text: ${dark ? "#f1f5f9" : "#0f172a"};
    --text-muted: ${dark ? "#94a3b8" : "#64748b"};
    --primary: #6366f1;
    --primary-light: #818cf8;
    --shadow: ${dark ? "0 4px 24px rgba(0,0,0,0.5)" : "0 4px 24px rgba(0,0,0,0.08)"};
  }

  body { background: var(--bg); color: var(--text); font-family: 'Inter', system-ui, sans-serif; line-height: 1.6; }

  .app { min-height: 100vh; display: flex; flex-direction: column; }

  /* NAV */
  .navbar {
    background: var(--surface);
    border-bottom: 1px solid var(--border);
    padding: 0 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: var(--shadow);
  }
  .nav-logo { display: flex; align-items: center; gap: 10px; font-size: 1.25rem; font-weight: 800; color: var(--primary); cursor: pointer; }
  .nav-right { display: flex; align-items: center; gap: 12px; }
  .search-box {
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 6px 12px;
    font-size: 0.875rem;
    color: var(--text-muted);
    cursor: pointer;
    transition: border-color 0.2s;
    min-width: 180px;
  }
  .search-box:hover { border-color: var(--primary); }
  .icon-btn {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 7px;
    cursor: pointer;
    color: var(--text);
    display: flex;
    align-items: center;
    transition: all 0.2s;
  }
  .icon-btn:hover { background: var(--primary); color: white; border-color: var(--primary); }

  /* LAYOUT */
  .layout { display: flex; flex: 1; }
  .sidebar {
    width: 260px;
    min-width: 260px;
    background: var(--surface);
    border-right: 1px solid var(--border);
    padding: 1.5rem 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
    overflow-y: auto;
    height: calc(100vh - 64px);
    position: sticky;
    top: 64px;
  }
  .sidebar-title { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-muted); padding: 0.5rem 1.5rem; margin-top: 0.5rem; }
  .sidebar-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 1.5rem;
    cursor: pointer;
    border-radius: 0;
    transition: all 0.15s;
    border-left: 3px solid transparent;
    font-size: 0.9rem;
    color: var(--text-muted);
  }
  .sidebar-item:hover { background: var(--surface2); color: var(--text); }
  .sidebar-item.active { background: var(--surface2); color: var(--primary); border-left-color: var(--primary); font-weight: 600; }
  .sidebar-badge { margin-left: auto; background: var(--surface2); color: var(--text-muted); font-size: 0.7rem; padding: 2px 6px; border-radius: 10px; }

  /* MAIN */
  .main { flex: 1; overflow-y: auto; }

  /* HOME */
  .home { padding: 2rem; }
  .home-hero { text-align: center; padding: 3rem 1rem; }
  .home-hero h1 { font-size: 2.5rem; font-weight: 900; margin-bottom: 1rem; background: linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .home-hero p { color: var(--text-muted); font-size: 1.1rem; max-width: 500px; margin: 0 auto 2rem; }
  .stats-row { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-bottom: 3rem; }
  .stat-card { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 1.25rem 2rem; text-align: center; }
  .stat-num { font-size: 2rem; font-weight: 800; color: var(--primary); }
  .stat-label { font-size: 0.8rem; color: var(--text-muted); }

  .lang-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; margin-top: 2rem; }
  .lang-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 1.75rem;
    cursor: pointer;
    transition: all 0.25s;
    position: relative;
    overflow: hidden;
  }
  .lang-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: var(--card-color);
  }
  .lang-card:hover { transform: translateY(-4px); box-shadow: var(--shadow); border-color: var(--card-color); }
  .lang-card-emoji { font-size: 2.5rem; margin-bottom: 0.75rem; }
  .lang-card h3 { font-size: 1.2rem; font-weight: 700; margin-bottom: 0.5rem; }
  .lang-card p { color: var(--text-muted); font-size: 0.875rem; margin-bottom: 1rem; }
  .lang-meta { display: flex; gap: 8px; flex-wrap: wrap; }
  .level-pill { font-size: 0.7rem; padding: 2px 8px; border-radius: 10px; font-weight: 600; }

  /* QUESTION LIST */
  .question-list-page { padding: 1.5rem; }
  .page-header { margin-bottom: 1.5rem; }
  .page-header h2 { font-size: 1.75rem; font-weight: 800; }
  .page-header p { color: var(--text-muted); margin-top: 4px; }
  .filter-row { display: flex; gap: 10px; margin-bottom: 1.5rem; flex-wrap: wrap; }
  .filter-btn {
    padding: 6px 14px;
    border-radius: 20px;
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text-muted);
    cursor: pointer;
    font-size: 0.8rem;
    transition: all 0.15s;
  }
  .filter-btn:hover, .filter-btn.active { background: var(--primary); color: white; border-color: var(--primary); }

  .q-grid { display: flex; flex-direction: column; gap: 10px; }
  .q-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 1.25rem 1.5rem;
    cursor: pointer;
    transition: all 0.15s;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .q-card:hover { border-color: var(--primary); transform: translateX(4px); }
  .q-card.solved { border-left: 3px solid #22c55e; }
  .q-index { font-size: 0.75rem; color: var(--text-muted); min-width: 32px; font-weight: 600; }
  .q-body { flex: 1; }
  .q-title { font-weight: 600; font-size: 0.95rem; margin-bottom: 4px; }
  .q-topic { font-size: 0.75rem; color: var(--text-muted); }
  .q-meta { display: flex; align-items: center; gap: 8px; }
  .level-tag { font-size: 0.7rem; font-weight: 700; padding: 2px 8px; border-radius: 4px; text-transform: uppercase; }

  /* QUESTION DETAIL */
  .question-detail { display: flex; height: calc(100vh - 64px); }
  .question-panel { width: 45%; border-right: 1px solid var(--border); overflow-y: auto; padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; }
  .editor-panel { flex: 1; display: flex; flex-direction: column; }

  .back-btn { display: flex; align-items: center; gap: 6px; color: var(--text-muted); cursor: pointer; font-size: 0.875rem; margin-bottom: 0.5rem; }
  .back-btn:hover { color: var(--primary); }

  .q-header h1 { font-size: 1.3rem; font-weight: 700; margin-bottom: 8px; }
  .q-tags { display: flex; gap: 8px; flex-wrap: wrap; }

  .description-box { background: var(--surface2); border-radius: 10px; padding: 1rem; font-size: 0.9rem; line-height: 1.7; }

  .hints-section { border: 1px solid var(--border); border-radius: 10px; overflow: hidden; }
  .hints-header { padding: 10px 14px; background: var(--surface2); cursor: pointer; display: flex; align-items: center; gap: 8px; font-size: 0.875rem; font-weight: 600; }
  .hint-item { padding: 8px 14px; font-size: 0.85rem; color: var(--text-muted); border-top: 1px solid var(--border); }

  .editor-toolbar { display: flex; align-items: center; gap: 8px; padding: 10px 1rem; background: var(--surface); border-bottom: 1px solid var(--border); }
  .toolbar-label { font-size: 0.75rem; font-weight: 600; color: var(--text-muted); flex: 1; }
  .run-btn { display: flex; align-items: center; gap: 6px; padding: 7px 16px; background: var(--primary); color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 0.85rem; font-weight: 600; transition: background 0.2s; }
  .run-btn:hover { background: var(--primary-light); }
  .reset-btn { display: flex; align-items: center; gap: 6px; padding: 7px 12px; background: var(--surface2); color: var(--text-muted); border: 1px solid var(--border); border-radius: 8px; cursor: pointer; font-size: 0.85rem; }

  .code-editor {
    flex: 1;
    background: ${dark ? "#0d1117" : "#1e1e1e"};
    color: #d4d4d4;
    font-family: 'Fira Code', 'Cascadia Code', monospace;
    font-size: 14px;
    line-height: 1.7;
    padding: 1rem;
    border: none;
    outline: none;
    resize: none;
    tab-size: 2;
  }

  .output-panel { border-top: 1px solid var(--border); max-height: 240px; overflow-y: auto; }
  .output-header { padding: 8px 1rem; background: var(--surface); font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 8px; }
  .output-content { padding: 1rem; font-family: monospace; font-size: 0.85rem; }

  /* RESULT */
  .result-box { border-radius: 10px; padding: 1rem 1.25rem; margin-top: 0.5rem; }
  .result-box.pass { background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.3); }
  .result-box.fail { background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3); }
  .result-score { font-size: 1.5rem; font-weight: 800; margin-bottom: 4px; }
  .result-feedback { font-size: 0.875rem; }
  .checks { margin-top: 10px; display: flex; flex-direction: column; gap: 4px; }
  .check-item { display: flex; align-items: center; gap: 6px; font-size: 0.8rem; }
  .check-pass { color: #22c55e; }
  .check-fail { color: #ef4444; }

  /* SOLUTION */
  .solution-box { background: #0d1117; border-radius: 10px; overflow: auto; }
  .solution-code { padding: 1rem; font-family: monospace; font-size: 0.8rem; line-height: 1.7; color: #d4d4d4; white-space: pre; }

  /* SEARCH */
  .search-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 1000; display: flex; align-items: flex-start; justify-content: center; padding-top: 100px; }
  .search-modal { background: var(--surface); border-radius: 16px; width: 600px; max-width: 95vw; overflow: hidden; box-shadow: 0 25px 60px rgba(0,0,0,0.5); }
  .search-input-row { display: flex; align-items: center; gap: 10px; padding: 1rem; border-bottom: 1px solid var(--border); }
  .search-input { flex: 1; background: none; border: none; outline: none; font-size: 1rem; color: var(--text); }
  .search-results { max-height: 400px; overflow-y: auto; }
  .search-result-item { padding: 0.875rem 1rem; cursor: pointer; border-bottom: 1px solid var(--border); display: flex; gap: 10px; align-items: center; }
  .search-result-item:hover { background: var(--surface2); }
  .search-result-lang { font-size: 0.7rem; font-weight: 700; color: var(--primary); min-width: 70px; }
  .search-result-title { font-size: 0.9rem; font-weight: 600; }
  .search-result-topic { font-size: 0.75rem; color: var(--text-muted); }

  /* LIVE PREVIEW */
  .preview-iframe { width: 100%; height: 100%; border: none; background: white; }

  /* PROGRESS */
  .progress-bar-bg { background: var(--surface2); border-radius: 10px; height: 6px; overflow: hidden; }
  .progress-bar-fill { height: 100%; background: linear-gradient(90deg, var(--primary), #8b5cf6); border-radius: 10px; transition: width 0.5s ease; }

  /* SCROLLBAR */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: var(--text-muted); }

  @media (max-width: 768px) {
    .sidebar { display: none; }
    .question-detail { flex-direction: column; }
    .question-panel { width: 100%; height: auto; }
    .lang-grid { grid-template-columns: 1fr; }
  }
`;

// ============================================================
// MOCK API (works without backend)
// ============================================================
const MOCK_QUESTIONS = {
  javascript: [
    { id: "js_001", topic: "Variables", level: "beginner", title: "Declare variables with let, const, var", description: "Declare a variable using let, one with const, and one with var.", starterCode: "// Declare your variables here\n", solution: "let name = 'Alice';\nconst PI = 3.14;\nvar age = 25;\nconsole.log(typeof name);", hints: ["Use let for mutable values", "const for constants"], explanation: "JavaScript has three ways to declare variables. let and const are block-scoped (ES6+), while var is function-scoped." },
    { id: "js_002", topic: "Functions", level: "beginner", title: "Arrow functions syntax", description: "Convert a regular function to an arrow function.", starterCode: "function add(a, b) {\n  return a + b;\n}\n\n// Convert to arrow function\nconst addArrow = ", solution: "const addArrow = (a, b) => a + b;\nconsole.log(addArrow(3, 4)); // 7", hints: ["Use =>", "Single expressions can omit return"], explanation: "Arrow functions provide shorter syntax. Single expression bodies can omit braces and return." },
    { id: "js_003", topic: "Arrays", level: "beginner", title: "Array methods: map, filter, reduce", description: "Use map, filter, and reduce on an array of numbers.", starterCode: "const numbers = [1,2,3,4,5,6,7,8,9,10];\n\nconst doubled = \nconst evens = \nconst sum = ", solution: "const numbers = [1,2,3,4,5,6,7,8,9,10];\nconst doubled = numbers.map(n => n * 2);\nconst evens = numbers.filter(n => n % 2 === 0);\nconst sum = numbers.reduce((acc, n) => acc + n, 0);\nconsole.log(doubled, evens, sum);", hints: ["map transforms each element", "filter keeps elements where callback is true", "reduce accumulates"], explanation: "map, filter, reduce are the core array HOFs. They never mutate the original array." },
    { id: "js_004", topic: "Closures", level: "intermediate", title: "Counter using closures", description: "Create a makeCounter function that returns increment, decrement, getCount.", starterCode: "function makeCounter(start = 0) {\n  // your code here\n}", solution: "function makeCounter(start = 0) {\n  let count = start;\n  return {\n    increment() { count++; },\n    decrement() { count--; },\n    getCount() { return count; }\n  };\n}\nconst c = makeCounter(10);\nc.increment(); c.increment();\nconsole.log(c.getCount()); // 12", hints: ["Inner function closes over outer variable", "count is private"], explanation: "A closure is a function that retains access to its outer scope after the outer function has returned." },
    { id: "js_005", topic: "Promises", level: "intermediate", title: "Create and chain Promises", description: "Create a fetchUser promise and chain .then() calls.", starterCode: "function fetchUser(id) {\n  // return a Promise\n}", solution: "function fetchUser(id) {\n  return new Promise((resolve, reject) => {\n    setTimeout(() => {\n      id > 0 ? resolve({ id, name: 'Alice' }) : reject(new Error('Invalid ID'));\n    }, 500);\n  });\n}\n\nfetchUser(1).then(u => console.log(u)).catch(e => console.error(e));", hints: ["new Promise((resolve, reject) => {...})", "resolve for success, reject for failure"], explanation: "Promises represent eventual completion of async operations. They chain with .then() and .catch()." },
    { id: "js_006", topic: "Async/Await", level: "intermediate", title: "Async/await with error handling", description: "Rewrite a Promise chain using async/await.", starterCode: "async function loadData() {\n  // fetch and return data\n}", solution: "async function loadData() {\n  try {\n    const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');\n    const data = await res.json();\n    console.log(data);\n    return data;\n  } catch (err) {\n    console.error('Error:', err);\n  }\n}", hints: ["async functions return Promises", "await pauses until resolved", "wrap in try/catch"], explanation: "async/await is syntactic sugar over Promises, making async code look synchronous." },
    { id: "js_007", topic: "Destructuring", level: "beginner", title: "Object and array destructuring", description: "Destructure a nested object and an array.", starterCode: "const user = { name: 'Bob', address: { city: 'NY' } };\nconst [first, , third] = [10, 20, 30];\n// Destructure user and array", solution: "const { name, address: { city } } = { name: 'Bob', address: { city: 'NY' } };\nconst [first, , third] = [10, 20, 30];\nconsole.log(name, city); // Bob NY\nconsole.log(first, third); // 10 30", hints: ["{ } for objects, [ ] for arrays", "Skip array elements with commas"], explanation: "Destructuring extracts values from arrays or properties from objects into distinct variables." },
    { id: "js_008", topic: "Event Loop", level: "advanced", title: "Predict event loop output", description: "What order will these console.logs run?", starterCode: "console.log('A');\nsetTimeout(() => console.log('B'), 0);\nPromise.resolve().then(() => console.log('C'));\nconsole.log('D');\n// Order?", solution: "// Output order: A, D, C, B\n// A - synchronous\n// D - synchronous\n// C - microtask (Promise.then)\n// B - macrotask (setTimeout)\nconsole.log('A');\nsetTimeout(() => console.log('B'), 0);\nPromise.resolve().then(() => console.log('C'));\nconsole.log('D');", hints: ["Sync first, then microtasks, then macrotasks", "Promises are microtasks, setTimeout is macrotask"], explanation: "JS Event Loop order: synchronous code → microtask queue (Promises) → macrotask queue (setTimeout, setInterval)." },
    { id: "js_009", topic: "Classes", level: "intermediate", title: "ES6 class inheritance", description: "Create Animal and Dog classes with inheritance.", starterCode: "class Animal {\n  // constructor and speak()\n}\n\nclass Dog extends Animal {\n  // override speak()\n}", solution: "class Animal {\n  constructor(name) { this.name = name; }\n  speak() { return `${this.name} makes a noise.`; }\n}\n\nclass Dog extends Animal {\n  speak() { return `${this.name} barks!`; }\n}\n\nconst d = new Dog('Rex');\nconsole.log(d.speak()); // Rex barks!", hints: ["extends for inheritance", "super() calls parent constructor"], explanation: "ES6 classes are syntactic sugar over prototype chains. extends creates subclasses, super() calls the parent." },
    { id: "js_010", topic: "Generators", level: "advanced", title: "Infinite sequence generator", description: "Create a generator that yields infinite numbers.", starterCode: "function* sequence(start = 0) {\n  // yield forever\n}", solution: "function* sequence(start = 0) {\n  let n = start;\n  while (true) yield n++;\n}\n\nconst gen = sequence(5);\nconsole.log(gen.next().value); // 5\nconsole.log(gen.next().value); // 6\nconsole.log(gen.next().value); // 7", hints: ["function* for generators", "yield pauses and returns", "while(true) for infinite"], explanation: "Generators are lazy — they compute values on demand. Useful for infinite sequences and async iteration." },
  ],
  react: [
    { id: "react_001", topic: "Components", level: "beginner", title: "Functional component with props", description: "Create a Greeting component accepting a name prop.", starterCode: "function Greeting({ name }) {\n  // return JSX\n}", solution: "function Greeting({ name }) {\n  return <h1>Hello, {name}!</h1>;\n}\n\n// <Greeting name='Alice' />", hints: ["Destructure props", "JSX uses {} for expressions"], explanation: "Functional components are functions that return JSX. Props are passed like HTML attributes." },
    { id: "react_002", topic: "useState", level: "beginner", title: "Counter with useState", description: "Build a counter with increment, decrement, reset buttons.", starterCode: "import { useState } from 'react';\n\nfunction Counter() {\n  // your code\n}", solution: "import { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return (\n    <div>\n      <h2>{count}</h2>\n      <button onClick={() => setCount(c => c + 1)}>+</button>\n      <button onClick={() => setCount(c => c - 1)}>-</button>\n      <button onClick={() => setCount(0)}>Reset</button>\n    </div>\n  );\n}", hints: ["useState returns [value, setter]", "Use functional updater for previous state"], explanation: "useState is the fundamental state hook. The setter can receive a value or updater function." },
    { id: "react_003", topic: "useEffect", level: "intermediate", title: "Fetch data with useEffect", description: "Fetch users from API on component mount.", starterCode: "import { useState, useEffect } from 'react';\n\nfunction UserList() {\n  // state and effect\n}", solution: "import { useState, useEffect } from 'react';\n\nfunction UserList() {\n  const [users, setUsers] = useState([]);\n  const [loading, setLoading] = useState(true);\n\n  useEffect(() => {\n    fetch('https://jsonplaceholder.typicode.com/users')\n      .then(r => r.json())\n      .then(data => { setUsers(data); setLoading(false); });\n    return () => {}; // cleanup\n  }, []);\n\n  if (loading) return <p>Loading...</p>;\n  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;\n}", hints: ["Empty [] = run once on mount", "Return cleanup function"], explanation: "useEffect handles side effects. Dependency array controls when it runs. Always clean up subscriptions." },
    { id: "react_004", topic: "Custom Hooks", level: "intermediate", title: "Create useFetch custom hook", description: "Extract fetch logic into a reusable useFetch hook.", starterCode: "function useFetch(url) {\n  // return { data, loading, error }\n}", solution: "import { useState, useEffect } from 'react';\n\nfunction useFetch(url) {\n  const [data, setData] = useState(null);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState(null);\n\n  useEffect(() => {\n    fetch(url)\n      .then(r => r.json())\n      .then(setData)\n      .catch(setError)\n      .finally(() => setLoading(false));\n  }, [url]);\n\n  return { data, loading, error };\n}", hints: ["Custom hooks start with 'use'", "Each call creates independent state"], explanation: "Custom hooks encapsulate reusable stateful logic. They can call other hooks internally." },
    { id: "react_005", topic: "Context", level: "intermediate", title: "Theme context with useContext", description: "Implement dark/light theme context.", starterCode: "const ThemeContext = createContext();\n\nfunction ThemeProvider({ children }) {\n  // provide theme\n}", solution: "import { createContext, useContext, useState } from 'react';\nconst ThemeContext = createContext();\n\nfunction ThemeProvider({ children }) {\n  const [dark, setDark] = useState(false);\n  return <ThemeContext.Provider value={{ dark, toggle: () => setDark(d => !d) }}>{children}</ThemeContext.Provider>;\n}\n\nconst useTheme = () => useContext(ThemeContext);\n\nfunction App() {\n  const { dark, toggle } = useTheme();\n  return <button onClick={toggle}>{dark ? 'Light' : 'Dark'} Mode</button>;\n}", hints: ["createContext() creates the context", "useContext() subscribes to it"], explanation: "Context avoids prop drilling. Create with createContext, provide with Provider, consume with useContext." },
    { id: "react_006", topic: "useReducer", level: "intermediate", title: "Todo list with useReducer", description: "Manage todo state with useReducer.", starterCode: "const reducer = (state, action) => {\n  // handle ADD, TOGGLE, DELETE\n}", solution: "const reducer = (state, action) => {\n  switch(action.type) {\n    case 'ADD': return [...state, { id: Date.now(), text: action.text, done: false }];\n    case 'TOGGLE': return state.map(t => t.id === action.id ? {...t, done: !t.done} : t);\n    case 'DELETE': return state.filter(t => t.id !== action.id);\n    default: return state;\n  }\n};\n\nfunction Todos() {\n  const [todos, dispatch] = useReducer(reducer, []);\n  // render with dispatch actions\n}", hints: ["Reducer is pure: (state, action) => newState", "dispatch({ type, payload }) triggers reducer"], explanation: "useReducer manages complex state. The reducer is a pure function returning next state based on action." },
    { id: "react_007", topic: "Performance", level: "advanced", title: "Optimize with memo, useMemo, useCallback", description: "Prevent unnecessary re-renders in a list.", starterCode: "// Optimize this expensive list component", solution: "import { memo, useMemo, useCallback } from 'react';\n\nconst Item = memo(({ item, onClick }) => (\n  <div onClick={() => onClick(item.id)}>{item.name}</div>\n));\n\nfunction List({ items, onSelect }) {\n  const sorted = useMemo(() => [...items].sort((a,b) => a.name.localeCompare(b.name)), [items]);\n  const handleClick = useCallback((id) => onSelect(id), [onSelect]);\n  return sorted.map(item => <Item key={item.id} item={item} onClick={handleClick} />);\n}", hints: ["memo wraps component to skip re-render", "useMemo caches computed values", "useCallback caches function references"], explanation: "memo + useMemo + useCallback create referential stability to prevent React from re-rendering unnecessarily." },
    { id: "react_008", topic: "Forms", level: "intermediate", title: "Controlled form with validation", description: "Build a login form with validation.", starterCode: "function LoginForm() {\n  // controlled form with validation\n}", solution: "import { useState } from 'react';\n\nfunction LoginForm() {\n  const [form, setForm] = useState({ email: '', password: '' });\n  const [errors, setErrors] = useState({});\n\n  const validate = () => {\n    const e = {};\n    if (!form.email.includes('@')) e.email = 'Invalid email';\n    if (form.password.length < 6) e.password = 'Min 6 chars';\n    return e;\n  };\n\n  const submit = (ev) => {\n    ev.preventDefault();\n    const e = validate();\n    if (Object.keys(e).length) { setErrors(e); return; }\n    alert('Login success!');\n  };\n\n  return (\n    <form onSubmit={submit}>\n      <input value={form.email} onChange={e => setForm({...form, email: e.target.value})} />\n      {errors.email && <p style={{color:'red'}}>{errors.email}</p>}\n      <input type='password' value={form.password} onChange={e => setForm({...form, password: e.target.value})} />\n      {errors.password && <p style={{color:'red'}}>{errors.password}</p>}\n      <button type='submit'>Login</button>\n    </form>\n  );\n}", hints: ["Controlled inputs sync with state", "Validate in submit handler"], explanation: "Controlled forms keep input values in React state via onChange, giving full control for validation." },
  ],
  nodejs: [
    { id: "node_001", topic: "File System", level: "beginner", title: "Read file with fs.promises", description: "Read a text file using async/await.", starterCode: "const fs = require('fs');\n\nasync function readFile(path) {\n  // read and return content\n}", solution: "const fs = require('fs');\n\nasync function readFile(path) {\n  const content = await fs.promises.readFile(path, 'utf8');\n  console.log(content);\n  return content;\n}\n\nreadFile('./package.json').catch(console.error);", hints: ["fs.promises for async/await style", "utf8 encoding returns string"], explanation: "fs.promises returns Promises for all file operations, enabling clean async/await syntax." },
    { id: "node_002", topic: "HTTP", level: "beginner", title: "Basic HTTP server", description: "Create a server responding to GET / and GET /api.", starterCode: "const http = require('http');\n\nconst server = http.createServer((req, res) => {\n  // handle routes\n});", solution: "const http = require('http');\n\nhttp.createServer((req, res) => {\n  if (req.url === '/' && req.method === 'GET') {\n    res.writeHead(200, {'Content-Type': 'text/plain'});\n    res.end('Hello World!');\n  } else if (req.url === '/api') {\n    res.writeHead(200, {'Content-Type': 'application/json'});\n    res.end(JSON.stringify({ status: 'ok' }));\n  } else {\n    res.writeHead(404); res.end('Not Found');\n  }\n}).listen(3000, () => console.log('Server on :3000'));", hints: ["req.url and req.method for routing", "res.writeHead sets status and headers"], explanation: "The built-in http module creates servers. In production, use Express for easier routing." },
    { id: "node_003", topic: "Express", level: "intermediate", title: "REST API with Express", description: "Create CRUD routes for a todo resource.", starterCode: "const express = require('express');\nconst app = express();\napp.use(express.json());\n\n// GET, POST, PUT, DELETE /todos", solution: "const express = require('express');\nconst app = express();\napp.use(express.json());\n\nlet todos = [], id = 1;\napp.get('/todos', (req, res) => res.json(todos));\napp.post('/todos', (req, res) => {\n  const t = { id: id++, text: req.body.text, done: false };\n  todos.push(t); res.status(201).json(t);\n});\napp.put('/todos/:id', (req, res) => {\n  const t = todos.find(t => t.id == req.params.id);\n  if (!t) return res.status(404).json({error: 'Not found'});\n  Object.assign(t, req.body); res.json(t);\n});\napp.delete('/todos/:id', (req, res) => {\n  todos = todos.filter(t => t.id != req.params.id);\n  res.status(204).send();\n});\napp.listen(3000);", hints: ["express.json() parses bodies", ":id for dynamic params", "Status 201 for created, 204 for deleted"], explanation: "Express simplifies routing. RESTful: GET list, POST create, PUT update, DELETE remove." },
    { id: "node_004", topic: "Middleware", level: "intermediate", title: "Custom middleware: logger + auth", description: "Write logger and authentication middleware.", starterCode: "function logger(req, res, next) {\n  // log and call next()\n}\n\nfunction auth(req, res, next) {\n  // check Authorization header\n}", solution: "function logger(req, res, next) {\n  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);\n  next();\n}\n\nfunction auth(req, res, next) {\n  const token = req.headers.authorization?.split(' ')[1];\n  if (!token) return res.status(401).json({ error: 'No token' });\n  if (token !== 'secret') return res.status(403).json({ error: 'Invalid token' });\n  next();\n}\n\napp.use(logger);\napp.get('/private', auth, (req, res) => res.json({ data: 'secret' }));", hints: ["next() passes to next middleware", "Error middleware has 4 params (err, req, res, next)"], explanation: "Middleware runs before route handlers. Call next() to continue, next(err) for error handling." },
    { id: "node_005", topic: "Streams", level: "advanced", title: "Process file with streams", description: "Stream a large file, transform, and write output.", starterCode: "const { Transform } = require('stream');\nconst fs = require('fs');\n\n// Create a transform stream and pipeline", solution: "const { Transform, pipeline } = require('stream');\nconst fs = require('fs');\n\nconst upper = new Transform({\n  transform(chunk, enc, cb) {\n    cb(null, chunk.toString().toUpperCase());\n  }\n});\n\npipeline(\n  fs.createReadStream('input.txt'),\n  upper,\n  fs.createWriteStream('output.txt'),\n  (err) => err ? console.error(err) : console.log('Done!')\n);", hints: ["Transform stream has transform(chunk, enc, cb)", "pipeline handles backpressure automatically"], explanation: "Streams process data chunk by chunk, enabling large file handling without memory exhaustion." },
  ],
  mongodb: [
    { id: "mongo_001", topic: "CRUD", level: "beginner", title: "Insert and query documents", description: "Insert documents and query with filters.", starterCode: "// Insert users and query by age\ndb.users.insertMany([...]);\ndb.users.find({ age: { $gt: 25 } });", solution: "db.users.insertMany([\n  { name: 'Alice', age: 28, role: 'admin' },\n  { name: 'Bob', age: 22, role: 'user' }\n]);\n\n// Find adults\ndb.users.find({ age: { $gte: 18 } });\n// Find admins with projection\ndb.users.find({ role: 'admin' }, { name: 1, _id: 0 });\n// Sort and limit\ndb.users.find({}).sort({ age: -1 }).limit(5);", hints: ["$gt, $lt, $gte, $lte for comparisons", "Projection: 1 include, 0 exclude"], explanation: "MongoDB's find() accepts a query filter and projection. Comparison operators prefix with $." },
    { id: "mongo_002", topic: "Aggregation", level: "intermediate", title: "Aggregation pipeline", description: "Calculate totals per category using aggregation.", starterCode: "db.sales.aggregate([\n  // $match, $group, $sort\n]);", solution: "db.sales.aggregate([\n  { $match: { date: { $gte: new Date('2024-01-01') } } },\n  { $group: {\n    _id: '$category',\n    total: { $sum: '$amount' },\n    count: { $sum: 1 },\n    avg: { $avg: '$amount' }\n  }},\n  { $sort: { total: -1 } },\n  { $limit: 5 }\n]);", hints: ["$match = WHERE", "$group = GROUP BY", "$sort = ORDER BY"], explanation: "The aggregation pipeline processes documents through stages, like Unix pipes for data." },
    { id: "mongo_003", topic: "Indexes", level: "intermediate", title: "Create and use indexes", description: "Create indexes to optimize common queries.", starterCode: "// Create indexes for these queries:\n// 1. Find by email (unique)\n// 2. Find by category + price\n// 3. Full-text search", solution: "// Unique index\ndb.users.createIndex({ email: 1 }, { unique: true });\n\n// Compound index\ndb.products.createIndex({ category: 1, price: 1 });\n\n// Text index\ndb.products.createIndex({ name: 'text', desc: 'text' });\ndb.products.find({ $text: { $search: 'wireless' } });\n\n// Analyze with explain()\ndb.users.find({ email: 'x@y.com' }).explain('executionStats');", hints: ["Indexes speed reads, slow writes", "explain() shows if index is used"], explanation: "Indexes are B-tree data structures that speed up queries. Use compound indexes for multi-field queries." },
    { id: "mongo_004", topic: "Mongoose", level: "intermediate", title: "Mongoose schema with validation", description: "Define a User schema with validators and middleware.", starterCode: "const mongoose = require('mongoose');\n\nconst userSchema = new mongoose.Schema({\n  // fields with validation\n});", solution: "const mongoose = require('mongoose');\n\nconst userSchema = new mongoose.Schema({\n  name: { type: String, required: true, trim: true },\n  email: { type: String, required: true, unique: true, lowercase: true },\n  password: { type: String, required: true, minlength: 8, select: false },\n  role: { type: String, enum: ['user', 'admin'], default: 'user' }\n}, { timestamps: true });\n\nuserSchema.pre('save', async function(next) {\n  if (this.isModified('password')) {\n    // hash password\n  }\n  next();\n});\n\nmodule.exports = mongoose.model('User', userSchema);", hints: ["required, min, max, enum for validation", "select: false hides field from queries", "pre('save') runs before saving"], explanation: "Mongoose schemas add structure and validation to MongoDB documents. Middleware (hooks) run before/after operations." },
    { id: "mongo_005", topic: "Transactions", level: "advanced", title: "Multi-document transactions", description: "Transfer money between accounts atomically.", starterCode: "async function transfer(fromId, toId, amount) {\n  // use session and transaction\n}", solution: "async function transfer(fromId, toId, amount) {\n  const session = await mongoose.startSession();\n  try {\n    session.startTransaction();\n    const from = await Account.findById(fromId).session(session);\n    if (from.balance < amount) throw new Error('Insufficient funds');\n    await Account.findByIdAndUpdate(fromId, { $inc: { balance: -amount } }, { session });\n    await Account.findByIdAndUpdate(toId, { $inc: { balance: amount } }, { session });\n    await session.commitTransaction();\n  } catch(e) {\n    await session.abortTransaction();\n    throw e;\n  } finally {\n    session.endSession();\n  }\n}", hints: ["startSession() begins a session", "Pass { session } to all operations", "commitTransaction or abortTransaction"], explanation: "Transactions ensure multiple operations succeed or fail atomically (ACID). Requires a replica set." },
  ],
  html_css: [
    { id: "html_001", topic: "Semantic HTML", level: "beginner", title: "Semantic page structure", description: "Create a semantic HTML5 page with header, nav, main, article, aside, footer.", starterCode: "<!DOCTYPE html>\n<html>\n<body>\n  <!-- Add semantic elements -->\n</body>\n</html>", solution: "<!DOCTYPE html>\n<html lang='en'>\n<head><meta charset='UTF-8'><title>Page</title></head>\n<body>\n  <header><nav><a href='/'>Home</a></nav></header>\n  <main>\n    <article>\n      <h1>Article Title</h1>\n      <p>Content...</p>\n    </article>\n    <aside><h2>Related</h2></aside>\n  </main>\n  <footer><p>© 2024</p></footer>\n</body>\n</html>", hints: ["header, main, footer for layout", "article for self-contained content", "aside for related content"], explanation: "Semantic HTML improves SEO and accessibility by conveying meaning to browsers and screen readers." },
    { id: "html_002", topic: "Flexbox", level: "beginner", title: "Flexbox navbar", description: "Create a responsive navbar with logo left, links right using Flexbox.", starterCode: "<nav class='nav'>\n  <div class='logo'>Brand</div>\n  <ul class='links'>\n    <li><a href='#'>Home</a></li>\n    <li><a href='#'>About</a></li>\n  </ul>\n</nav>", solution: "<style>\n.nav { display: flex; justify-content: space-between; align-items: center; padding: 1rem 2rem; background: #1a1a2e; }\n.logo { color: #e94560; font-weight: bold; font-size: 1.5rem; }\n.links { display: flex; list-style: none; gap: 2rem; }\n.links a { color: white; text-decoration: none; }\n.links a:hover { color: #e94560; }\n</style>\n<nav class='nav'>\n  <div class='logo'>Brand</div>\n  <ul class='links'><li><a href='#'>Home</a></li><li><a href='#'>About</a></li></ul>\n</nav>", hints: ["justify-content: space-between", "align-items: center for vertical centering"], explanation: "Flexbox is for 1D layouts. justify-content controls main axis, align-items controls cross axis." },
    { id: "html_003", topic: "CSS Grid", level: "intermediate", title: "Photo gallery with CSS Grid", description: "Create a masonry-like gallery with spanning items.", starterCode: "<div class='gallery'>\n  <div class='photo'>1</div>\n  <div class='photo featured'>2</div>\n</div>", solution: "<style>\n.gallery { display: grid; grid-template-columns: repeat(3, 1fr); grid-auto-rows: 200px; gap: 1rem; }\n.photo { background: #667eea; display: flex; align-items: center; justify-content: center; color: white; border-radius: 8px; }\n.featured { grid-column: span 2; grid-row: span 2; background: #764ba2; }\n</style>\n<div class='gallery'>\n  <div class='photo featured'>Featured</div>\n  <div class='photo'>2</div>\n  <div class='photo'>3</div>\n  <div class='photo'>4</div>\n</div>", hints: ["grid-template-columns: repeat(3, 1fr)", "grid-column: span 2 to span multiple columns"], explanation: "CSS Grid is for 2D layouts. span lets items occupy multiple grid tracks." },
    { id: "html_004", topic: "CSS Animations", level: "intermediate", title: "Keyframe animations", description: "Create a CSS spinner and pulsing button.", starterCode: "<div class='spinner'></div>\n<button class='pulse'>Click</button>", solution: "<style>\n.spinner { width: 50px; height: 50px; border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%; animation: spin 1s linear infinite; }\n@keyframes spin { to { transform: rotate(360deg); } }\n.pulse { padding: 12px 24px; background: #e74c3c; color: white; border: none; border-radius: 25px; animation: pulse 2s ease-in-out infinite; }\n@keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.05); } }\n</style>\n<div class='spinner'></div>\n<button class='pulse'>Click</button>", hints: ["@keyframes defines animation steps", "animation: name duration timing iteration"], explanation: "CSS animations use @keyframes for multi-step transitions. CSS animations are GPU-accelerated." },
    { id: "html_005", topic: "CSS Variables", level: "intermediate", title: "CSS custom properties theme", description: "Implement dark/light theme with CSS variables.", starterCode: ":root {\n  /* define light theme variables */\n}\n[data-theme='dark'] {\n  /* override for dark */\n}", solution: ":root {\n  --bg: #fff; --text: #111; --primary: #4f46e5;\n}\n[data-theme='dark'] {\n  --bg: #0f172a; --text: #f1f5f9; --primary: #818cf8;\n}\nbody { background: var(--bg); color: var(--text); transition: all 0.3s; }\n.btn { background: var(--primary); color: white; padding: 0.5rem 1rem; border: none; border-radius: 8px; }\n\n// JS: document.documentElement.setAttribute('data-theme', 'dark');", hints: ["--var-name defines a custom property", "var(--var-name) uses it", "Toggle via setAttribute on documentElement"], explanation: "CSS variables (custom properties) enable dynamic theming. Changing the root variable instantly updates all elements." },
    { id: "html_006", topic: "Responsive Design", level: "intermediate", title: "Mobile-first responsive layout", description: "Create a card grid that changes columns at breakpoints.", starterCode: ".grid {\n  /* mobile first: 1 column\n     tablet: 2 columns\n     desktop: 3 columns */\n}", solution: ".grid {\n  display: grid;\n  grid-template-columns: 1fr; /* mobile */\n  gap: 1rem;\n  padding: 1rem;\n}\n\n@media (min-width: 640px) {\n  .grid { grid-template-columns: repeat(2, 1fr); }\n}\n\n@media (min-width: 1024px) {\n  .grid { grid-template-columns: repeat(3, 1fr); }\n}\n\n.card { background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }", hints: ["Mobile-first: start with smallest", "min-width for progressive enhancement"], explanation: "Mobile-first CSS starts with mobile styles then adds complexity at larger breakpoints using min-width media queries." },
  ],
};

// ============================================================
// COMPONENTS
// ============================================================

function Navbar({ dark, setDark, onSearch, onHome }) {
  return (
    <nav className="navbar">
      <div className="nav-logo" onClick={onHome}>
        <Icon.Code />
        <span>CodePrep Pro</span>
      </div>
      <div className="nav-right">
        <div className="search-box" onClick={onSearch}>
          <Icon.Search />
          Search questions...
        </div>
        <button className="icon-btn" onClick={() => setDark(d => !d)} title="Toggle theme">
          {dark ? <Icon.Sun /> : <Icon.Moon />}
        </button>
      </div>
    </nav>
  );
}

function Sidebar({ selected, onSelect, topics }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-title">Languages</div>
      {topics.map(t => (
        <div
          key={t.id}
          className={`sidebar-item ${selected === t.id ? "active" : ""}`}
          onClick={() => onSelect(t.id)}
        >
          <span>{LANG_CONFIG[t.id]?.emoji}</span>
          <span>{t.name}</span>
          <span className="sidebar-badge">{t.questionCount}</span>
        </div>
      ))}
    </aside>
  );
}

function LevelTag({ level }) {
  return (
    <span className="level-tag" style={{ background: LEVEL_COLORS[level] + "22", color: LEVEL_COLORS[level] }}>
      {level}
    </span>
  );
}

function HomePage({ topics, onSelectLang, stats }) {
  return (
    <div className="home">
      <div className="home-hero">
        <h1>Master Coding Interviews</h1>
        <p>300+ curated coding questions across JavaScript, React, Node.js, MongoDB, HTML & CSS — from beginner to advanced.</p>
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-num">{stats?.totalQuestions || "300+"}</div>
            <div className="stat-label">Questions</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">5</div>
            <div className="stat-label">Technologies</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">3</div>
            <div className="stat-label">Difficulty Levels</div>
          </div>
        </div>
      </div>

      <div className="lang-grid">
        {topics.map(t => {
          const cfg = LANG_CONFIG[t.id] || {};
          return (
            <div
              key={t.id}
              className="lang-card"
              style={{ "--card-color": cfg.color }}
              onClick={() => onSelectLang(t.id)}
            >
              <div className="lang-card-emoji">{cfg.emoji}</div>
              <h3>{t.name}</h3>
              <p>{t.questionCount} questions across {t.topics?.length || "multiple"} topics</p>
              <div className="lang-meta">
                {t.levels?.map(l => (
                  <span key={l} className="level-pill" style={{ background: LEVEL_COLORS[l] + "22", color: LEVEL_COLORS[l] }}>
                    {l}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function QuestionList({ language, questions, onSelect, solved }) {
  const [levelFilter, setLevelFilter] = useState("all");
  const [topicFilter, setTopicFilter] = useState("all");
  const cfg = LANG_CONFIG[language] || {};

  const topics = ["all", ...new Set(questions.map(q => q.topic))];
  const filtered = questions.filter(q =>
    (levelFilter === "all" || q.level === levelFilter) &&
    (topicFilter === "all" || q.topic === topicFilter)
  );

  const solvedCount = questions.filter(q => solved.has(q.id)).length;

  return (
    <div className="question-list-page">
      <div className="page-header">
        <h2>{cfg.emoji} {cfg.label} Questions</h2>
        <p style={{ marginTop: 8 }}>
          {solvedCount}/{questions.length} solved
        </p>
        <div className="progress-bar-bg" style={{ marginTop: 10, maxWidth: 300 }}>
          <div className="progress-bar-fill" style={{ width: `${questions.length ? (solvedCount / questions.length) * 100 : 0}%` }} />
        </div>
      </div>

      <div className="filter-row">
        {["all", "beginner", "intermediate", "advanced"].map(l => (
          <button key={l} className={`filter-btn ${levelFilter === l ? "active" : ""}`} onClick={() => setLevelFilter(l)}>
            {l === "all" ? "All Levels" : l}
          </button>
        ))}
      </div>

      <div className="filter-row">
        {topics.map(t => (
          <button key={t} className={`filter-btn ${topicFilter === t ? "active" : ""}`} onClick={() => setTopicFilter(t)}>
            {t === "all" ? "All Topics" : t}
          </button>
        ))}
      </div>

      <div className="q-grid">
        {filtered.map((q, i) => (
          <div key={q.id} className={`q-card ${solved.has(q.id) ? "solved" : ""}`} onClick={() => onSelect(q)}>
            <div className="q-index">#{i + 1}</div>
            <div className="q-body">
              <div className="q-title">{q.title}</div>
              <div className="q-topic">{q.topic}</div>
            </div>
            <div className="q-meta">
              <LevelTag level={q.level} />
              {solved.has(q.id) && <span style={{ color: "#22c55e", fontSize: "0.75rem" }}>✓ Solved</span>}
              <Icon.ChevronRight />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuestionDetail({ question, language, onBack, onSolved, isSolved }) {
  const [code, setCode] = useState(question.starterCode || "");
  const [showHints, setShowHints] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);
  const cfg = LANG_CONFIG[language] || {};
  const isHTMLCSS = language === "html_css";

  const handleReset = () => {
    setCode(question.starterCode || "");
    setResult(null);
    setShowSolution(false);
  };

  const handleValidate = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/validate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId: question.id, language, userCode: code }),
      });
      const data = await res.json();
      setResult(data);
      if (data.passed) onSolved(question.id);
    } catch {
      // Offline validation
      const hasContent = code.trim().length > 20;
      const notStarter = code.trim() !== (question.starterCode || "").trim();
      const score = hasContent && notStarter ? 75 : 20;
      const passed = score >= 60;
      setResult({
        score,
        passed,
        feedback: passed ? "✅ Looks like you've written a solution! Compare with the reference below." : "❌ Try to implement the solution before validating.",
        checks: [
          { pass: hasContent, message: hasContent ? "Code has content" : "Code appears empty" },
          { pass: notStarter, message: notStarter ? "Code has been modified" : "Starter code unchanged" },
        ],
      });
      if (passed) onSolved(question.id);
    }
    setLoading(false);
  };

  return (
    <div className="question-detail">
      {/* Left: Question Panel */}
      <div className="question-panel">
        <div className="back-btn" onClick={onBack}>
          ← Back to list
        </div>

        <div className="q-header">
          <h1>{question.title}</h1>
          <div className="q-tags">
            <LevelTag level={question.level} />
            <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{question.topic}</span>
            {isSolved && <span style={{ color: "#22c55e", fontSize: "0.75rem", fontWeight: 700 }}>✓ Solved</span>}
          </div>
        </div>

        <div className="description-box">{question.description}</div>

        {/* Hints */}
        <div className="hints-section">
          <div className="hints-header" onClick={() => setShowHints(h => !h)}>
            <Icon.Lightbulb />
            Hints {showHints ? "▾" : "▸"}
          </div>
          {showHints && question.hints?.map((h, i) => (
            <div key={i} className="hint-item">💡 {h}</div>
          ))}
        </div>

        {/* Result */}
        {result && (
          <div className={`result-box ${result.passed ? "pass" : "fail"}`}>
            <div className="result-score">{result.score}%</div>
            <div className="result-feedback">{result.feedback}</div>
            {result.checks && (
              <div className="checks">
                {result.checks.map((c, i) => (
                  <div key={i} className={`check-item ${c.pass ? "check-pass" : "check-fail"}`}>
                    {c.pass ? <Icon.Check /> : <Icon.X />}
                    {c.message}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Solution */}
        <div>
          <button
            className="filter-btn"
            style={{ display: "flex", alignItems: "center", gap: 6 }}
            onClick={() => setShowSolution(s => !s)}
          >
            <Icon.Eye /> {showSolution ? "Hide" : "Show"} Solution
          </button>
          {showSolution && (
            <>
              <div className="solution-box" style={{ marginTop: 10 }}>
                <div className="solution-code">{question.solution}</div>
              </div>
              {question.explanation && (
                <div className="description-box" style={{ marginTop: 10, fontSize: "0.85rem" }}>
                  <strong>💡 Explanation:</strong><br />{question.explanation}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Right: Editor Panel */}
      <div className="editor-panel">
        <div className="editor-toolbar">
          <span className="toolbar-label">
            {cfg.emoji} {cfg.label} Editor
          </span>
          {isHTMLCSS && (
            <button className="reset-btn" onClick={() => setPreview(p => !p)}>
              <Icon.Eye /> {preview ? "Code" : "Preview"}
            </button>
          )}
          <button className="reset-btn" onClick={handleReset}>
            <Icon.Refresh /> Reset
          </button>
          <button className="run-btn" onClick={handleValidate} disabled={loading}>
            {loading ? "Checking..." : <><Icon.Play /> Validate</>}
          </button>
        </div>

        {preview && isHTMLCSS ? (
          <iframe
            className="preview-iframe"
            srcDoc={code}
            title="Live Preview"
            sandbox="allow-scripts"
          />
        ) : (
          <textarea
            className="code-editor"
            value={code}
            onChange={e => setCode(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Tab") {
                e.preventDefault();
                const s = e.target.selectionStart;
                const newCode = code.substring(0, s) + "  " + code.substring(e.target.selectionEnd);
                setCode(newCode);
                setTimeout(() => { e.target.selectionStart = e.target.selectionEnd = s + 2; }, 0);
              }
            }}
            spellCheck={false}
          />
        )}

        <div className="output-panel">
          <div className="output-header">
            <span>⬛</span> Output / Feedback
          </div>
          <div className="output-content" style={{ color: result ? (result.passed ? "#22c55e" : "#ef4444") : "#94a3b8" }}>
            {result
              ? result.feedback
              : 'Write your solution above and click "Validate" to check it.'}
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchModal({ onClose, topics, onSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    const q = query.toLowerCase();
    const found = [];
    Object.entries(MOCK_QUESTIONS).forEach(([lang, qs]) => {
      qs.forEach(question => {
        if (question.title.toLowerCase().includes(q) || question.topic.toLowerCase().includes(q) || question.description.toLowerCase().includes(q)) {
          found.push({ ...question, language: lang });
        }
      });
    });
    setResults(found.slice(0, 15));
  }, [query]);

  return (
    <div className="search-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="search-modal">
        <div className="search-input-row">
          <Icon.Search />
          <input
            className="search-input"
            placeholder="Search questions by title or topic..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
          />
          <button className="icon-btn" onClick={onClose}><Icon.X /></button>
        </div>
        <div className="search-results">
          {results.length === 0 && query && (
            <div style={{ padding: "1rem", color: "var(--text-muted)", textAlign: "center" }}>No results found</div>
          )}
          {results.map(r => (
            <div key={`${r.language}-${r.id}`} className="search-result-item" onClick={() => { onSelect(r.language, r); onClose(); }}>
              <div className="search-result-lang">{LANG_CONFIG[r.language]?.emoji} {LANG_CONFIG[r.language]?.label}</div>
              <div>
                <div className="search-result-title">{r.title}</div>
                <div className="search-result-topic">{r.topic} · {r.level}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================
export default function App() {
  const [dark, setDark] = useState(true);
  const [page, setPage] = useState("home"); // home | list | detail
  const [selectedLang, setSelectedLang] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [solved, setSolved] = useState(new Set());
  const [showSearch, setShowSearch] = useState(false);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    // Build topics from mock data
    const t = Object.entries(MOCK_QUESTIONS).map(([key, qs]) => ({
      id: key,
      name: LANG_CONFIG[key]?.label || key,
      questionCount: qs.length,
      levels: [...new Set(qs.map(q => q.level))],
      topics: [...new Set(qs.map(q => q.topic))],
    }));
    setTopics(t);
  }, []);

  const handleSelectLang = (lang) => {
    setSelectedLang(lang);
    setSelectedQuestion(null);
    setPage("list");
  };

  const handleSelectQuestion = (q) => {
    setSelectedQuestion(q);
    setPage("detail");
  };

  const handleSearchSelect = (lang, q) => {
    setSelectedLang(lang);
    setSelectedQuestion(q);
    setPage("detail");
  };

  const handleSolved = (id) => {
    setSolved(s => new Set([...s, id]));
  };

  const currentQuestions = selectedLang ? (MOCK_QUESTIONS[selectedLang] || []) : [];

  return (
    <AppContext.Provider value={{ solved, dark }}>
      <style>{getStyles(dark)}</style>
      <div className="app">
        <Navbar
          dark={dark}
          setDark={setDark}
          onSearch={() => setShowSearch(true)}
          onHome={() => setPage("home")}
        />

        {showSearch && (
          <SearchModal
            onClose={() => setShowSearch(false)}
            topics={topics}
            onSelect={handleSearchSelect}
          />
        )}

        <div className="layout">
          <Sidebar
            selected={selectedLang}
            onSelect={handleSelectLang}
            topics={topics}
          />

          <div className="main">
            {page === "home" && (
              <HomePage
                topics={topics}
                onSelectLang={handleSelectLang}
                stats={{ totalQuestions: Object.values(MOCK_QUESTIONS).flat().length }}
              />
            )}

            {page === "list" && selectedLang && (
              <QuestionList
                language={selectedLang}
                questions={currentQuestions}
                onSelect={handleSelectQuestion}
                solved={solved}
              />
            )}

            {page === "detail" && selectedQuestion && (
              <QuestionDetail
                question={selectedQuestion}
                language={selectedLang}
                onBack={() => setPage("list")}
                onSolved={handleSolved}
                isSolved={solved.has(selectedQuestion.id)}
              />
            )}
          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
}
