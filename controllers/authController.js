const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { setCookie, clearCookie } = require('../utils/cookieUtil');

const JWT_SECRET = process.env.JWT_SECRET;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5500';

// ✅ Set up transporter using Gmail + App Password
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Check if user already exists
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'User exists' });

    // Create user with hashed password
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hash, role, verified: false });

    // Generate verification token & link
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
    const link = `${CLIENT_URL}/verify-email.html?token=${token}`;

 await transporter.sendMail({
  from: `"Auth Demo" <${process.env.EMAIL_USER}>`,
  to: process.env.EMAIL_USER,  // always go to you
  subject: 'New User Verification',
  html: `
    <h2>New User Registered: ${user.username}</h2>
    <p><strong>Email:</strong> ${user.email}</p>
    <p><strong>MongoDB Object ID:</strong> ${user._id}</p>
    <p>Please verify their email by clicking <a href="${link}">here</a>.</p>
    <p>If the link doesn’t work, paste this URL in your browser:</p>
    <p>${link}</p>
  `
});




    console.log('✅ Verification email sent to:', user.email);
    return res.status(201).json({ message: 'Registered. Check your email to verify.' });

  } catch (err) {
    console.error('❌ Registration or Email Error:', err);

    // If user was partially created, delete them
    if (err.message.includes('sendMail') || err.code === 11000) {
      await User.findOneAndDelete({ email });
    }

    return res.status(500).json({ message: 'Registration failed or email could not be sent.' });
  }
};


exports.verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id);

    if (!user) {
      return res.status(400).send(`
        <h2>User not found ❌</h2>
        <a href="/index.html">Go to Login</a>
      `);
    }

    if (user.verified) {
      return res.send(`
        <h2>Email already verified ✅</h2>
        <a href="/index.html">Go to Login</a>
      `);
    }

    user.verified = true;
    await user.save();

    res.send(`
      <h2>Email verified successfully ✅</h2>
      <a href="/index.html">You can now login</a>
    `);
  } catch (err) {
    console.error('Email verification error:', err);
    res.status(400).send(`
      <h2>Invalid or expired token ❌</h2>
      <a href="/index.html">Back to login</a>
    `);
  }
};

exports.login = async (req, res) => {
  const { email, password, rememberMe } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
 if (!user.isVerified) return res.status(401).json({ message: 'Email not verified' });


  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Invalid credentials' });

  const jwtToken = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: rememberMe ? '7d' : '1h'
  });

  setCookie(res, 'token', jwtToken, rememberMe ? 7 : 1);
  res.json({ message: 'Login success', role: user.role });
};

exports.logout = (req, res) => {
  clearCookie(res, 'token');
  res.json({ message: 'Logged out' });
};
