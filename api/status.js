module.exports = async function handler(req, res) {
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

  res.status(200).json({
    status: 'ok',
    providers: {
      groq: GROQ_API_KEYS.length > 0,
      count: GROQ_API_KEYS.length
    }
  });
};
