const express = require('express');
const router = express.Router();
const { register, login, verifyEmail, resetPassword, updatePassword } = require('../controllers/userController');

router.post('/register', register);
router.post('/login', login);
router.get('/verify-email', verifyEmail);
router.post('/reset-password', resetPassword);
router.post('/update-password', updatePassword);

module.exports = router;
