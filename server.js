const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

app.post('/proxy', async (req, res) => {
  try {
    const googleScriptURL = 'https://script.google.com/macros/s/AKfycbzGMPOr5r1wbCBTdI-7Z85Xtz18SCLuuZ7jIOZTfrV_E93jkk1iWIp-db4kjNkTf8rICQ/exec';
    const response = await fetch(googleScriptURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await response.text();
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.send(data);
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).send('Proxy failed');
  }
});

// Optional: Health check route
app.get('/', (req, res) => res.send('Proxy is running'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));