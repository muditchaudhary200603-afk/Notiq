module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: { message: 'Method not allowed' } });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: { message: 'Service unavailable' } });
  }

  try {
    const messages = Array.isArray(req.body?.messages) ? req.body.messages : [];
    if (!messages.length) {
      return res.status(400).json({ error: { message: 'Invalid request' } });
    }

    const upstream = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        temperature: 0.2,
        max_tokens: 8000,
        messages
      })
    });

    const data = await upstream.json();
    if (!upstream.ok) {
      console.error('Groq API error:', upstream.status, data);
      if (upstream.status === 429) {
        return res.status(429).json({ error: { message: 'Rate limit exceeded' } });
      }
      if (upstream.status === 401 || upstream.status === 403) {
        return res.status(401).json({ error: { message: 'Unauthorized' } });
      }
      return res.status(502).json({ error: { message: 'Something went wrong, please try again' } });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Groq proxy failure:', error);
    return res.status(502).json({ error: { message: 'Something went wrong, please try again' } });
  }
};
