const express = require('express');
const router = express.Router();
const {authenticate} = require('../middleware/authMiddleware');
const { generateOtp, verifyOtp, resetPasswordViaOtp } = require('../controllers/otpController');
const { validateOTPRequest, validateVerifyOTP, checkOTPExists } = require('../middleware/otpMiddleware');

router.post('/generate', authenticate, validateOTPRequest, generateOtp);
router.post('/verify', authenticate, validateVerifyOTP, checkOTPExists, verifyOtp);
router.post('/reset-password', authenticate, validateVerifyOTP, checkOTPExists, resetPasswordViaOtp);

module.exports = router;
