// routes/auth.js
const express = require('express');
const { register, login, getMe } = require('../controllers/authController');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticateToken, getMe);

router.post('/verify-token', authenticateToken, (req, res) => {
    const token = req.headers['authorization'];
    res.json({ message: 'Token is valid', token, user: req.user });
});

module.exports = router;
