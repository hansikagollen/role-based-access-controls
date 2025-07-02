require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/authRoutes');

// Import HTML pages as JS strings
const loginPage = require('./views/index');
const registerPage = require('./views/register');
const userDashboard = require('./views/user-dashboard');
const adminDashboard = require('./views/admin-dashboard');

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Serve static files (if needed for JS or CSS)
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api/auth', authRoutes);

// HTML routes
app.get('/', (req, res) => res.redirect('/login'));
app.get('/login', (req, res) => res.send(loginPage));
app.get('/register', (req, res) => res.send(registerPage));
app.get('/user-dashboard', (req, res) => res.send(userDashboard));
app.get('/admin-dashboard', (req, res) => res.send(adminDashboard));

// Connect MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));
