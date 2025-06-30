require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/authRoutes');

const app = express();

// ✅ CORS: Frontend served from SAME server (no need for cross-origin)
app.use(cors({
  origin: 'http://localhost:5000', 
  credentials: true
}));

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ Serve static frontend
app.use(express.static(path.join(__dirname, 'public')));

// ✅ API routes
app.use('/api/auth', authRoutes);

// ✅ MongoDB connect + start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));
