const OTP = require('../models/otp'); // Ensure the correct import
const User = require('../models/user'); // Import User model
const bcrypt = require('bcrypt'); // For hashing passwords

exports.generateOtp = async (req, res) => {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
    const expiry = new Date(Date.now() + 15 * 60 * 1000); // OTP expires in 15 minutes

    try {
        await OTP.create({ email, otp, expiry });
        // Send OTP via email (implementation depends on your email service)
        res.status(200).json({ message: 'OTP sent to ' + email });
    } catch (error) {
        console.error('Error generating OTP:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const otpRecord = await OTP.findOne({ where: { email, otp } });
        if (!otpRecord || new Date() > otpRecord.expiry) {
            return res.status(400).json({ message: 'Invalid or expired OTP.' });
        }
        
        // Instead of deleting, mark the OTP as used
        await otpRecord.update({ used: true }); // Assuming you have a 'used' column
        res.status(200).json({ message: 'OTP verified successfully.' });
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

exports.resetPasswordViaOtp = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    try {
        // Check if the OTP record exists and is valid
        const otpRecord = await OTP.findOne({ where: { email, otp } });

        if (!otpRecord) {
            return res.status(400).json({ message: 'Invalid or expired OTP.' });
        }

        // Check if the OTP has expired
        const currentTime = new Date();
        if (currentTime > otpRecord.expiry) {
            return res.status(400).json({ message: 'Invalid or expired OTP.' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password
        await User.update({ password: hashedPassword }, { where: { email } });

        // Optionally: Delete the OTP record after successful password reset
        await OTP.destroy({ where: { email, otp } });

        return res.status(200).json({ message: 'Password reset successfully.' });
    } catch (error) {
        console.error('Error resetting password:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};
