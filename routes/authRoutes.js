const express = require('express');
const router = express.Router();
const { register, login, logout, forgotPassword, resetPassword, verifyEmail } = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');
const { allowRoles } = require('../middleware/roleMiddleware');
const authController = require('../controllers/authController');


router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

router.get('/verify-email', authController.verifyEmail);
router.get('/user-dashboard', verifyToken, allowRoles('User','Admin'), (req,res)=>res.sendFile('user-dashboard.html',{root:'public'}));
router.get('/admin-dashboard', verifyToken, allowRoles('Admin'), (req,res)=>res.sendFile('admin-dashboard.html',{root:'public'}));

module.exports = router;
