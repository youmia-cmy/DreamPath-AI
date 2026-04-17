const express = require('express');
const https = require('https');
const path = require('path');

const app = express();
const PORT = 3000;

const SCREEN_NAME = '_StarryMiu';

// Cache stats for 5 minutes
let statsCache = { tweets: '6,656', followers: '3,604', following: '216' };
let lastFetch = 0;
const CACHE_TTL = 5 * 60 * 1000;

/**
 * Fetch the x.com profile page and extract stats from embedded JSON data.
 * The HTML contains "followers_count":N, "friends_count":N, "statuses_count":N
 * embedded in the server-rendered script payload.
 */
function httpsGet(url) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const opts = {
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    };
    const req = https.request(opts, (res) => {
      // Follow redirects (301/302/307/308)
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return httpsGet(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    req.setTimeout(20000, () => { req.destroy(); reject(new Error('timeout')); });
    req.end();
  });
}

async function fetchTwitterStats() {
  const now = Date.now();
  if (now - lastFetch < CACHE_TTL) return statsCache;

  try {
    const profileUrl = `https://x.com/${SCREEN_NAME}`;
    const res = await httpsGet(profileUrl);

    if (res.status !== 200) {
      console.error(`[Twitter] Profile page returned status ${res.status}`);
      return statsCache;
    }

    const html = res.body;

    // Extract counts from embedded JSON in the HTML
    const followersMatch = html.match(/"followers_count":(\d+)/);
    const friendsMatch = html.match(/"friends_count":(\d+)/);
    const statusesMatch = html.match(/"statuses_count":(\d+)/);

    if (followersMatch && friendsMatch && statusesMatch) {
      statsCache = {
        tweets: Number(statusesMatch[1]).toLocaleString('en-US'),
        followers: Number(followersMatch[1]).toLocaleString('en-US'),
        following: Number(friendsMatch[1]).toLocaleString('en-US'),
      };
      lastFetch = now;
      console.log('[Twitter] Stats updated:', statsCache);
    } else {
      console.error('[Twitter] Could not parse stats from profile page');
      // Log what we found for debugging
      if (followersMatch) console.log('  followers_count found:', followersMatch[1]);
      if (friendsMatch) console.log('  friends_count found:', friendsMatch[1]);
      if (statusesMatch) console.log('  statuses_count found:', statusesMatch[1]);
    }
  } catch (err) {
    console.error('[Twitter] Failed to fetch stats:', err.message);
  }

  return statsCache;
}

// API endpoint
app.get('/api/stats', async (req, res) => {
  try {
    const stats = await fetchTwitterStats();
    res.json(stats);
  } catch (err) {
    res.json(statsCache);
  }
});

// Serve static files
app.use(express.static(path.join(__dirname)));

// Fetch stats on startup
fetchTwitterStats();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
