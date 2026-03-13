module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: { message: 'Method not allowed' } });
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

  if (GROQ_API_KEYS.length === 0) {
    return res.status(500).json({ error: { message: 'Service unavailable: No API keys configured' } });
  }

  // Randomize key selection for serverless distribution
  const apiKey = GROQ_API_KEYS[Math.floor(Math.random() * GROQ_API_KEYS.length)];

  try {
    const { messages, model, temperature, max_tokens } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: { message: 'Invalid request: messages must be an array' } });
    }

    const upstream = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model || 'llama-3.3-70b-versatile',
        temperature: temperature ?? 0.7,
        max_tokens: max_tokens ?? 2048,
        messages
      })
    });

    const data = await upstream.json();
    if (!upstream.ok) {
        console.error('Groq API error:', upstream.status, data);
        return res.status(upstream.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Groq proxy failure:', error);
    return res.status(502).json({ error: { message: 'Something went wrong, please try again' } });
  }
};
