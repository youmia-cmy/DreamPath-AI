const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

const MOBILE_RE = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile/i;

// Serve the correct homepage based on User-Agent
app.get('/', (req, res) => {
  const ua = req.headers['user-agent'] || '';
  const isMobile = MOBILE_RE.test(ua);
  const file = isMobile ? 'mobile.html' : 'desktop.html';
  res.sendFile(path.join(__dirname, file));
});

// Also allow direct access
app.get('/mobile.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'mobile.html'));
});
app.get('/desktop.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'desktop.html'));
});

// Serve other static files
app.use(express.static(path.join(__dirname)));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
