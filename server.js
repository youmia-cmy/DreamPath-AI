const express = require('express');
const https = require('https');
const path = require('path');

const app = express();
const PORT = 3000;

const SCREEN_NAME = '_StarryMiu';
const BEARER = 'AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA';
const GRAPHQL_ENDPOINT = 'https://x.com/i/api/graphql/G3KGOASz96M-Qu0nwmGXNg/UserByScreenName';

// Cache stats for 5 minutes
let statsCache = { tweets: '6,656', followers: '3,604', following: '216' };
let lastFetch = 0;
let guestToken = null;
let guestTokenTime = 0;
const CACHE_TTL = 5 * 60 * 1000;
const GUEST_TOKEN_TTL = 30 * 60 * 1000; // refresh guest token every 30 min

function httpsRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const opts = {
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        ...options.headers,
      },
    };
    const req = https.request(opts, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    req.setTimeout(15000, () => { req.destroy(); reject(new Error('timeout')); });
    req.end();
  });
}

async function getGuestToken() {
  const now = Date.now();
  if (guestToken && now - guestTokenTime < GUEST_TOKEN_TTL) return guestToken;

  const res = await httpsRequest('https://api.twitter.com/1.1/guest/activate.json', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${decodeURIComponent(BEARER)}` },
  });
  const json = JSON.parse(res.body);
  if (json.guest_token) {
    guestToken = json.guest_token;
    guestTokenTime = now;
    console.log('[Twitter] Got guest token:', guestToken);
    return guestToken;
  }
  throw new Error('Failed to get guest token');
}

async function fetchTwitterStats() {
  const now = Date.now();
  if (now - lastFetch < CACHE_TTL) return statsCache;

  try {
    const token = await getGuestToken();

    const variables = JSON.stringify({
      screen_name: SCREEN_NAME,
      withSafetyModeUserFields: true,
    });
    const features = JSON.stringify({
      hidden_profile_subscriptions_enabled: true,
      responsive_web_graphql_exclude_directive_enabled: true,
      verified_phone_label_enabled: false,
      responsive_web_graphql_skip_user_profile_image_extensions_enabled: false,
      responsive_web_graphql_timeline_navigation_enabled: true,
    });

    const url = `${GRAPHQL_ENDPOINT}?variables=${encodeURIComponent(variables)}&features=${encodeURIComponent(features)}`;

    const res = await httpsRequest(url, {
      headers: {
        'Authorization': `Bearer ${decodeURIComponent(BEARER)}`,
        'x-guest-token': token,
      },
    });

    const json = JSON.parse(res.body);
    const legacy = json?.data?.user?.result?.legacy;

    if (legacy) {
      statsCache = {
        tweets: Number(legacy.statuses_count).toLocaleString('en-US'),
        followers: Number(legacy.followers_count).toLocaleString('en-US'),
        following: Number(legacy.friends_count).toLocaleString('en-US'),
      };
      lastFetch = now;
      console.log('[Twitter] Stats updated:', statsCache);
    } else {
      // Token might be expired, reset it to force refresh next time
      console.error('[Twitter] Unexpected response, resetting guest token');
      guestToken = null;
    }
  } catch (err) {
    console.error('[Twitter] Failed to fetch stats:', err.message);
    guestToken = null; // force token refresh on next attempt
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
