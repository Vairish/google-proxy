const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

// ✅ CORS Middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200); // Preflight request
  }
  next();
});

app.post('/proxy', async (req, res) => {
  try {
    const googleScriptURL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
    const response = await fetch(googleScriptURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await response.text();
    res.send(data);
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).send('Proxy failed');
  }
});

app.get('/', (req, res) => res.send('Proxy is running'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
