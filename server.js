const express = require('express');
const https = require('https');
const http = require('http');
const path = require('path');

const app = express();
const PORT = 3000;

// Cache stats for 5 minutes to avoid hammering nitter
let statsCache = { tweets: '6,656', followers: '3,606', following: '217' };
let lastFetch = 0;
const CACHE_TTL = 5 * 60 * 1000;

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      // Follow redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchPage(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.setTimeout(10000, () => { req.destroy(); reject(new Error('timeout')); });
  });
}

async function scrapeStats() {
  const now = Date.now();
  if (now - lastFetch < CACHE_TTL) return statsCache;

  const nitterInstances = [
    'https://nitter.net/_StarryMiu',
    'https://nitter.privacydev.net/_StarryMiu',
  ];

  for (const url of nitterInstances) {
    try {
      const html = await fetchPage(url);

      // Extract stats from nitter HTML
      // Pattern: Tweets\s*</span>\s*<span class="...">NUMBER
      // Or from the stat list items
      const tweetsMatch = html.match(/Tweets[\s\S]*?<span[^>]*>([\d,]+)<\/span>/i)
        || html.match(/(\d[\d,]+)\s*<\/span>\s*[\s\S]*?Tweets/i);
      const followersMatch = html.match(/Followers[\s\S]*?<span[^>]*>([\d,]+)<\/span>/i)
        || html.match(/(\d[\d,]+)\s*<\/span>\s*[\s\S]*?Followers/i);
      const followingMatch = html.match(/Following[\s\S]*?<span[^>]*>([\d,]+)<\/span>/i)
        || html.match(/(\d[\d,]+)\s*<\/span>\s*[\s\S]*?Following/i);

      // Alternative: look for the profile stat list items
      // <li class="..."><span class="...">NUMBER</span>Label</li>
      const statPattern = /<li[^>]*>[\s\S]*?<span[^>]*>([\d,]+)<\/span>\s*<span[^>]*>(Tweets|Following|Followers|Likes)<\/span>[\s\S]*?<\/li>/gi;
      let m;
      const parsed = {};
      while ((m = statPattern.exec(html)) !== null) {
        parsed[m[2].toLowerCase()] = m[1];
      }

      // Also try simpler nitter format: "Tweets6,656" etc from our scraped data pattern
      const simplePattern = /(Tweets|Followers|Following|Likes)([\d,]+)/g;
      while ((m = simplePattern.exec(html)) !== null) {
        parsed[m[1].toLowerCase()] = m[2];
      }

      const tweets = parsed.tweets || (tweetsMatch && tweetsMatch[1]);
      const followers = parsed.followers || (followersMatch && followersMatch[1]);
      const following = parsed.following || (followingMatch && followingMatch[1]);

      if (tweets || followers || following) {
        statsCache = {
          tweets: tweets || statsCache.tweets,
          followers: followers || statsCache.followers,
          following: following || statsCache.following
        };
        lastFetch = now;
        console.log(`[Stats] Updated from ${url}:`, statsCache);
        return statsCache;
      }
    } catch (err) {
      console.error(`[Stats] Failed to fetch from ${url}:`, err.message);
    }
  }

  console.log('[Stats] All instances failed, using cached values');
  return statsCache;
}

// API endpoint
app.get('/api/stats', async (req, res) => {
  try {
    const stats = await scrapeStats();
    res.json(stats);
  } catch (err) {
    res.json(statsCache);
  }
});

// Serve static files
app.use(express.static(path.join(__dirname)));

// Fetch stats on startup
scrapeStats();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
