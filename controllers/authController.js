const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { setCookie, clearCookie } = require('../utils/cookieUtil');

const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hash, role });
  res.status(201).json({ message: 'User registered', user });
};

exports.login = async (req, res) => {
  const { email, password, rememberMe } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: rememberMe ? '7d' : '1h'
  });

  setCookie(res, 'token', token, rememberMe ? 7 : 1);

  res.json({ message: 'Login success', role: user.role });
};

exports.logout = (req, res) => {
  clearCookie(res, 'token');
  res.json({ message: 'Logged out' });
};
