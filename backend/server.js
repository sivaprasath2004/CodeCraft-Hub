const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Load all question banks
const dataDir = path.join(__dirname, 'data');

function loadQuestions(filename) {
  try {
    const filePath = path.join(dataDir, filename);
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    console.error(`Failed to load ${filename}:`, e.message);
    return [];
  }
}

const questionBanks = {
  javascript: loadQuestions('javascript.json'),
  react: loadQuestions('react.json'),
  nodejs: loadQuestions('nodejs.json'),
  mongodb: loadQuestions('mongodb.json'),
  html_css: loadQuestions('html_css.json'),
};

// GET /api/topics - List all topics
app.get('/api/topics', (req, res) => {
  const topics = Object.entries(questionBanks).map(([key, questions]) => {
    const levels = [...new Set(questions.map(q => q.level))];
    const topicsList = [...new Set(questions.map(q => q.topic))];
    return {
      id: key,
      name: formatTopicName(key),
      questionCount: questions.length,
      levels,
      topics: topicsList,
    };
  });
  res.json(topics);
});

// GET /api/questions/:language - Get questions for a language
app.get('/api/questions/:language', (req, res) => {
  const { language } = req.params;
  const { level, topic, limit, offset } = req.query;

  let questions = questionBanks[language];
  if (!questions) return res.status(404).json({ error: `Language '${language}' not found` });

  if (level) questions = questions.filter(q => q.level === level);
  if (topic) questions = questions.filter(q => q.topic === topic);

  const total = questions.length;
  const start = parseInt(offset) || 0;
  const end = start + (parseInt(limit) || questions.length);
  const paginated = questions.slice(start, end);

  res.json({
    total,
    offset: start,
    limit: parseInt(limit) || total,
    questions: paginated,
  });
});

// GET /api/questions/:language/:id - Get a single question
app.get('/api/questions/:language/:id', (req, res) => {
  const { language, id } = req.params;
  const questions = questionBanks[language];
  if (!questions) return res.status(404).json({ error: 'Language not found' });

  const question = questions.find(q => q.id === id);
  if (!question) return res.status(404).json({ error: 'Question not found' });
  res.json(question);
});

// POST /api/validate - Validate user code answer
app.post('/api/validate', (req, res) => {
  const { questionId, language, userCode } = req.body;
  const questions = questionBanks[language];
  if (!questions) return res.status(404).json({ error: 'Language not found' });

  const question = questions.find(q => q.id === questionId);
  if (!question) return res.status(404).json({ error: 'Question not found' });

  // Basic validation: check if key concepts from solution are present
  const solutionKeywords = extractKeywords(question.solution);
  const userKeywords = extractKeywords(userCode);
  const matchCount = solutionKeywords.filter(kw => userKeywords.includes(kw)).length;
  const score = Math.round((matchCount / solutionKeywords.length) * 100);

  // Check for obvious patterns
  const checks = runChecks(userCode, question);

  res.json({
    questionId,
    score,
    passed: score >= 60,
    checks,
    feedback: generateFeedback(score, checks),
    solution: question.solution,
    explanation: question.explanation,
  });
});

// GET /api/search - Search questions
app.get('/api/search', (req, res) => {
  const { q, language } = req.query;
  if (!q) return res.json([]);

  const searchQuery = q.toLowerCase();
  let results = [];

  const langsToSearch = language ? [language] : Object.keys(questionBanks);

  langsToSearch.forEach(lang => {
    const questions = questionBanks[lang] || [];
    questions.forEach(question => {
      if (
        question.title.toLowerCase().includes(searchQuery) ||
        question.description.toLowerCase().includes(searchQuery) ||
        question.topic.toLowerCase().includes(searchQuery)
      ) {
        results.push({ ...question, language: lang });
      }
    });
  });

  res.json(results.slice(0, 20));
});

// GET /api/stats - Overall stats
app.get('/api/stats', (req, res) => {
  const stats = {};
  let totalQuestions = 0;

  Object.entries(questionBanks).forEach(([lang, questions]) => {
    const byLevel = {};
    questions.forEach(q => {
      byLevel[q.level] = (byLevel[q.level] || 0) + 1;
    });
    stats[lang] = { total: questions.length, byLevel };
    totalQuestions += questions.length;
  });

  res.json({ totalQuestions, byLanguage: stats });
});

// Helper functions
function formatTopicName(key) {
  const names = {
    javascript: 'JavaScript',
    react: 'React',
    nodejs: 'Node.js',
    mongodb: 'MongoDB',
    html_css: 'HTML & CSS',
  };
  return names[key] || key;
}

function extractKeywords(code) {
  // Extract meaningful programming keywords
  const keywords = code.match(/\b(function|const|let|var|return|class|extends|async|await|=>|\.map|\.filter|\.reduce|import|export|useState|useEffect|require|module\.exports)\b/g) || [];
  return [...new Set(keywords)];
}

function runChecks(code, question) {
  const checks = [];

  if (code.trim().length < 10) {
    checks.push({ pass: false, message: 'Code appears to be empty' });
  } else {
    checks.push({ pass: true, message: 'Code has content' });
  }

  // Check if it's not just copying starter code
  if (question.starterCode && code.trim() === question.starterCode.trim()) {
    checks.push({ pass: false, message: 'Looks like starter code was not modified' });
  } else {
    checks.push({ pass: true, message: 'Code has been modified from starter' });
  }

  // Check for syntax errors (simple heuristic)
  const openBraces = (code.match(/\{/g) || []).length;
  const closeBraces = (code.match(/\}/g) || []).length;
  if (Math.abs(openBraces - closeBraces) > 2) {
    checks.push({ pass: false, message: 'Possible missing or extra braces' });
  } else {
    checks.push({ pass: true, message: 'Brace balance looks correct' });
  }

  return checks;
}

function generateFeedback(score, checks) {
  if (score >= 90) return '🎉 Excellent! Your solution matches the expected approach very well.';
  if (score >= 70) return '✅ Good job! Your solution covers most key concepts.';
  if (score >= 50) return '⚠️ Partial solution. Review the hints and try to include more key concepts.';
  return '❌ Your solution needs more work. Review the explanation and try again.';
}

app.listen(PORT, () => {
  console.log(`✅ Interview Prep API running on http://localhost:${PORT}`);
  const total = Object.values(questionBanks).reduce((sum, q) => sum + q.length, 0);
  console.log(`📚 Loaded ${total} questions across ${Object.keys(questionBanks).length} topics`);
});

module.exports = app;
