const OTP = require('../models/otp'); // Ensure the correct import

exports.validateOTPRequest = (req, res, next) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'Email is required.' });
    }
    next();
};

exports.validateVerifyOTP = (req, res, next) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
        return res.status(400).json({ message: 'Email and OTP are required.' });
    }
    next();
};

exports.checkOTPExists = async (req, res, next) => {
    const { email, otp } = req.body;

    // Check if user is authenticated
    if (!req.user || !req.user.id) {
        return res.status(401).json({ message: 'User not authenticated.' });
    }

    try {
        // Query based on email and otp only
        const otpRecord = await OTP.findOne({ where: { email, otp } });
        if (!otpRecord) {
            return res.status(400).json({ message: 'Invalid OTP.' });
        }
        req.otpRecord = otpRecord; 
        next();
    } catch (error) {
        console.error('Error checking OTP:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};
