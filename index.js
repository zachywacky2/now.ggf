const express = require('express');
const cookieParser = require('cookie-parser');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');


const app = express();

// Replace the URL and cookies with your actual values
const targetURL = 'https://beta7.apktbg.com/';

const cookies = [
  // ... (your cookie objects here)
];

// Middleware to parse cookies
app.use(cookieParser());

// Redirect after 2 seconds
app.get('/redirect2', (req, res) => {
  res.redirect(302, '/class?domain=roblox');
});

// Redirect after 10 seconds
app.get('/redirect10', (req, res) => {
  res.redirect(302, '/uv/education/hvtrs8%2F-nmw%2Cge%2Frlcy-ulcwbg%2F5054-nmw');
});

// Serve the index.html when explicitly requested
// Serve the index.html when explicitly requested
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Proxy middleware to add cookies to the request
const proxyMiddleware = createProxyMiddleware({
  target: targetURL,
  changeOrigin: true,
  onProxyReq: (proxyReq) => {
    // Adding cookies to the request
    cookies.forEach(cookie => {
      proxyReq.setHeader('cookie', `${cookie.name}=${cookie.value}`);
    });
  },
});

// Use the proxy middleware for everything else
app.use((req, res, next) => {
  if (req.url !== '/index.html' && req.url !== '/redirect2' && req.url !== '/redirect10') {
    proxyMiddleware(req, res, next);
  } else {
    next();
  }
});

const PORT = 5000; // Change this to the desired port number
app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});
