const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3011;

app.use(cors());
app.use(express.json());

// Only serve static for local development
if (process.env.NODE_ENV !== 'production') {
  app.use(express.static(path.join(__dirname)));
}

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

// NO wildcard catch-all here. Vercel routes will handle fallbox to index.html if needed.
// But for sanity, let's keep one for local ONLY
if (process.env.NODE_ENV !== 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });
}

// Export for Vercel
module.exports = app;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n  ✦ Notiq server running locally at http://localhost:${PORT}`);
  });
}
