const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { sendVerificationEmail, sendResetEmail } = require('../config/emailService');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({ 
            name, 
            email, 
            password: hashedPassword 
        });

        const verificationToken = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        await sendVerificationEmail(newUser.email, verificationToken);

        return res.status(201).json({
            message: "User registered successfully. Please verify your email."
        });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                message: "Registration failed",
                error: error
            });
        }
        console.error('Error during registration:', error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Login failed", error });
    }
};


exports.verifyEmail = async (req, res) => {
    console.log('Received verification request:', req.query);
    const { token } = req.query; 

    if (!token) {
        return res.status(400).send('Verification token is required.');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findByPk(decoded.id);

        if (!user) {
            return res.status(404).send('User not found.');
        }

        if (user.isVerified) {
            return res.send('Your email is already verified.');
        }

        user.isVerified = true;
        await user.save();

        return res.send('Email verified successfully!');
    } catch (error) {
        console.error('Error during email verification:', error);
        return res.status(500).send('An error occurred during verification.');
    }
};

exports.resetPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: "User not found" });

        const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '15m' });
        user.resetToken = resetToken;
        await user.save();

        sendResetEmail(user.email, resetToken);
        res.json({ message: "Password reset email sent" });
    } catch (error) {
        res.status(500).json({ message: "Reset failed", error });
    }
};

exports.updatePassword = async (req, res) => {
    const { token, newPassword } = req.body;

    if (!newPassword) {
        return res.status(400).json({ message: "New password is required." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.json({ message: "Password updated successfully" });
    } catch (error) {
        console.error('Error updating password:', error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Invalid token" });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token has expired" });
        }
        res.status(500).json({ message: "Update failed" });
    }
};

