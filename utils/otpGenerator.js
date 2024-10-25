const crypto = require('crypto');

const generateOtp = () => {
    // Generate a 6-digit random OTP
    return crypto.randomInt(100000, 999999).toString();
};

const generateOtpWithExpiry = () => {
    const otp = generateOtp();
    const expiry = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes
    return { otp, expiry };
};

module.exports = { generateOtp, generateOtpWithExpiry };
