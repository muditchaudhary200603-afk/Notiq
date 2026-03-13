require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname)));

// ── GET GROQ API KEYS ──────────────────────────
function getKeys(envVar) {
  const val = process.env[envVar];
  if (!val) return [];
  return val.split(',').map(k => k.trim()).filter(Boolean);
}

const keyIndex = { groq: 0 };

function nextKey() {
  const keys = getKeys('GROQ_API_KEYS');
  if (!keys.length) {
    return process.env.GROQ_API_KEY || null;
  }
  const key = keys[keyIndex.groq % keys.length];
  keyIndex.groq++;
  return key;
}

// ── GROQ PROVIDER ─────────────────────────────────────
async function callGroq(messages, key) {
  const groqBody = {
    model: 'llama-3.3-70b-versatile',
    temperature: 0.2,
    max_tokens: 8000,
    messages: messages
  };
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + key
    },
    body: JSON.stringify(groqBody)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Groq ${res.status}: ${JSON.stringify(data)}`);
  data.provider = 'groq';
  return data;
}

// ── SIMPLE CACHE ──────────────────────────────────────
const cache = new Map();
const CACHE_TTL = 1000 * 60 * 30; // 30 minutes

function getCacheKey(messages) {
  const user = messages.find(m => m.role === 'user')?.content || '';
  return user.substring(0, 200).replace(/\s+/g, ' ').trim();
}

// ── MAIN API ROUTE ────────────────────────────────────
app.post(['/api/groq', '/api/generate'], async (req, res) => {
  const { messages } = req.body;

  // Check cache first
  const ck = getCacheKey(messages || []);
  if (cache.has(ck)) {
    const cached = cache.get(ck);
    if (Date.now() - cached.time < CACHE_TTL) {
      console.log('  ⚡ Cache hit');
      return res.json({ ...cached.data, cached: true });
    }
    cache.delete(ck);
  }

  // Get key
  const targetKey = nextKey();

  if (!targetKey) {
    return res.status(500).json({ error: { message: 'Service unavailable' } });
  }

  try {
    console.log(`  → Trying Groq...`);
    const data = await callGroq(req.body.messages || [], targetKey);

    // Cache successful response
    cache.set(ck, { data, time: Date.now() });
    console.log(`  ✓ Groq succeeded`);
    return res.json(data);
  } catch (err) {
    console.log(`  ✗ Groq failed: ${err.message.substring(0, 150)}`);
    return res.status(502).json({ error: { message: 'Something went wrong, please try again' } });
  }
});

// Status endpoint for settings page
app.get('/api/status', (req, res) => {
  res.json({
    providers: {
      groq: !!nextKey()
    },
    cacheSize: cache.size
  });
});

app.get('*', (req, res) => {
  if (req.path === '/app' || req.path === '/app.html') {
    res.sendFile(path.join(__dirname, 'app.html'));
  } else {
    res.sendFile(path.join(__dirname, 'index.html'));
  }
});

app.listen(PORT, '0.0.0.0', () => {
  const nets = require('os').networkInterfaces();
  let ip = 'localhost';
  for (const iface of Object.values(nets)) for (const n of iface) if (n.family === 'IPv4' && !n.internal) { ip = n.address; break; }
  const qk = nextKey();
  console.log(`\n  ✦ Notiq server running at:`);
  console.log(`    Local:   http://localhost:${PORT}`);
  console.log(`    Network: http://${ip}:${PORT}\n`);
  console.log(`  Providers:`);
  console.log(`    Groq:       ${qk ? '✓ configured' : '✗ add GROQ_API_KEY to .env'}\n`);
});
