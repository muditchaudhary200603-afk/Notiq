const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3011;

app.use(cors());
app.use(express.json());

// For local development, serve from public
app.use(express.static(path.join(__dirname, 'public')));

const GROQ_API_KEYS = [
  process.env.GROQ_API_KEY,
  process.env.GROQ_API_KEY_1,
  process.env.GROQ_API_KEY_2,
  process.env.GROQ_API_KEY_3,
  process.env.GROQ_API_KEY_4,
  process.env.GROQ_API_KEY_5,
  process.env.GROQ_API_KEY_6,
  process.env.GROQ_API_KEY_7,
  process.env.GROQ_API_KEY_8,
  process.env.GROQ_API_KEY_9,
  process.env.GROQ_API_KEY_10,
].filter(Boolean);

let keyIndex = 0;
const nextKey = () => GROQ_API_KEYS.length ? GROQ_API_KEYS[keyIndex++ % GROQ_API_KEYS.length] : null;

const cache = new Map();

app.post('/api/groq', async (req, res) => {
  const { messages, model, temperature, max_tokens, stream } = req.body;
  const cacheKey = JSON.stringify({ messages, model, temperature });

  if (cache.has(cacheKey)) {
    return res.json(cache.get(cacheKey));
  }

  const key = nextKey();
  if (!key) return res.status(500).json({ error: 'No Groq API key configured' });

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages,
        model: model || 'llama-3.3-70b-versatile',
        temperature: temperature ?? 0.7,
        max_tokens: max_tokens ?? 2048,
        stream: stream ?? false
      })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || 'Groq API error');

    if (!stream) cache.set(cacheKey, data);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/status', (req, res) => {
  res.json({
    providers: {
      groq: !!nextKey()
    },
    cacheSize: cache.size
  });
});

// Wildcard for local fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  const nets = require('os').networkInterfaces();
  let ip = 'localhost';
  for (const iface of Object.values(nets)) {
    for (const n of iface) {
      if (n.family === 'IPv4' && !n.internal) {
        ip = n.address;
        break;
      }
    }
  }
  console.log(`\n  ✦ Notiq server running at:`);
  console.log(`    Local:   http://localhost:${PORT}`);
  console.log(`    Network: http://${ip}:${PORT}\n`);
});
