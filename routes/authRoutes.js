const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');
const { allowRoles } = require('../middleware/roleMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

router.get('/user-dashboard', verifyToken, allowRoles('User', 'Admin'), (req, res) =>
  res.json({ message: 'Welcome to User Dashboard' })
);
router.get('/admin-dashboard', verifyToken, allowRoles('Admin'), (req, res) =>
  res.json({ message: 'Welcome to Admin Dashboard' })
);

module.exports = router;
