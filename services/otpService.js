const Otp = require('../config/otpService');
const User = require('../models/user'); // Ensure this points to your User model
const { generateOtpWithExpiry } = require('../utils/otpGenerator');
const { sendOtpEmail } = require('../utils/otpSender');

const createAndSendOtp = async (email) => {
    const { otp, expiry } = generateOtpWithExpiry();

    const otpEntry = await Otp.create({ email, otp, expiry });

    await sendOtpEmail(email, otp);

    return otpEntry;
};

const verifyOtp = async (email, otp) => {
    const otpEntry = await Otp.findOne({ where: { email, otp } });

    if (!otpEntry) {
        throw new Error('Invalid OTP');
    }

    if (Date.now() > otpEntry.expiry) {
        throw new Error('OTP has expired');
    }

    await otpEntry.destroy(); // Delete OTP entry after verification
    return otpEntry; // Optionally return the user or other relevant info
};

const resetPasswordViaOtp = async (email, otp, newPassword) => {
    // Verify OTP
    await verifyOtp(email, otp);

    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw new Error('User not found');
    }

    // Update the user's password
    user.password = await bcrypt.hash(newPassword, 10); // Hash the new password
    await user.save();

    return user; // Optionally return the updated user info
};

module.exports = { createAndSendOtp, verifyOtp, resetPasswordViaOtp };
