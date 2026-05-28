const express = require('express');
const session = require('express-session');
require('dotenv').config();

const app = express();

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 1. Configure express-session
app.use(session({
  secret: process.env.SESSION_SECRET || 'local_development_secret_fallback',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false, // Set to true if using HTTPS in production
    httpOnly: true, // Prevents client-side JS from reading the cookie
    maxAge: 24 * 60 * 60 * 1000 // Session expires in 24 hours
  }
}));

// Fallback credentials for local testing
const ADMIN_USER = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'password123';

// 2. Authentication Middleware
const requireAuth = (req, res, next) => {
  if (req.session && req.session.isAdmin) {
    return next(); // User is authenticated, proceed to the next handler
  }
  
  // If it's an API request, send a 401 Unauthorized status
  if (req.path.startsWith('/api/')) {
    return res.status(401).json({ error: 'Unauthorized. Please log in.' });
  }
  
  // If it's a page request, redirect to the login page
  res.redirect('/login');
};

// 3. Login API Route
app.post('/admin/login', (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    req.session.isAdmin = true;
    return res.json({ success: true, message: 'Logged in successfully' });
  }

  res.status(401).json({ success: false, message: 'Invalid credentials' });
});

// 4. Logout Route
app.post('/api/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Could not log out' });
    }
    res.clearCookie('connect.sid'); // Clear the session cookie
    res.json({ success: true, message: 'Logged out successfully' });
  });
});

// 5. Apply Protection to Routes
const path = require('path'); 

// Serve public login page first so users can actually log in
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html')); 
});

// Protect the root route and serve the dashboard
app.get('/', requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Protect the API endpoint
app.get('/api/requests', requireAuth, (req, res) => {
  // Your logic to fetch and return requests data goes here
  res.json({ data: "Secure admin data here" });
});

app.listen(3000, () => console.log('Server running on port 3000'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});