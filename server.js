const express = require('express');
const compression = require('compression');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Enable gzip compression for all responses
app.use(compression());

const MOBILE_RE = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile/i;

// Serve the correct homepage based on User-Agent
app.get('/', (req, res) => {
  const ua = req.headers['user-agent'] || '';
  const isMobile = MOBILE_RE.test(ua);
  const file = isMobile ? 'mobile.html' : 'desktop.html';
  res.sendFile(path.join(__dirname, file));
});

// Clean URL for sponsor page
app.get('/sponsor', (req, res) => {
  res.sendFile(path.join(__dirname, 'sponsor.html'));
});

// Liuyao page
app.get('/liuyao', (req, res) => {
  res.sendFile(path.join(__dirname, 'liuyao.html'));
});

// Tarot page
app.get('/taluopai', (req, res) => {
  res.sendFile(path.join(__dirname, 'taluopai.html'));
});

// ChainBadge / Zhuizong page
app.get('/zhuizong', (req, res) => {
  res.sendFile(path.join(__dirname, 'zhuizong.html'));
});

// Redirect .html URLs to clean URLs
app.get('/:page.html', (req, res) => {
  const page = req.params.page;
  const cleanPages = ['liuyao', 'taluopai', 'zhuizong', 'sponsor'];
  if (cleanPages.includes(page)) {
    return res.redirect(301, `/${page}`);
  }
  // For mobile.html and desktop.html, serve directly
  const filePath = path.join(__dirname, `${page}.html`);
  if (fs.existsSync(filePath)) {
    return res.sendFile(filePath);
  }
  res.status(404).send('Not found');
});

// Serve static files with caching
app.use(express.static(path.join(__dirname), {
  maxAge: '1d',
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.js')) {
      res.setHeader('Cache-Control', 'public, max-age=86400');
    }
  }
}));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
