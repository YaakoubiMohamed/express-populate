const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Assuming middleware for JWT verification (e.g., using jwt middleware)
const verifyToken = require('../middlewares/auth')

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout); // Consider token expiration or blacklisting

// Protected route (requires valid JWT)
router.get('/profile', verifyToken, authController.profile);

module.exports = router;
