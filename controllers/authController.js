const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bcryptSaltRounds = 10;
const User = require('../models/User');
const { setCookie, clearCookie } = require('../utils/cookieUtil');

const JWT_SECRET = process.env.JWT_SECRET;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5000';

// ✅ Register (without email verification)
exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'User exists' });

  const hash = await bcrypt.hash(password, bcryptSaltRounds);
  const user = await User.create({ username, email, password: hash, role, verified: true });

  res.status(201).json({ message: 'Registered successfully' });
};

// ✅ Login
exports.login = async (req, res) => {
  const { email, password, rememberMe } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid creds' });
  if (!await bcrypt.compare(password, user.password)) return res.status(401).json({ message: 'Invalid creds' });

  const jwtToken = jwt.sign(
    { id: user._id, role: user.role },
    JWT_SECRET,
    { expiresIn: rememberMe ? '7d' : '1h' }
  );

  setCookie(res, 'token', jwtToken, rememberMe ? 7 : 1);

  res.status(200).json({
    message: 'Login success',
    email: user.email,
    role: user.role
  });
};

// ✅ Logout
exports.logout = (req, res) => {
  clearCookie(res, 'token');
  res.json({ message: 'Logged out' });
};
