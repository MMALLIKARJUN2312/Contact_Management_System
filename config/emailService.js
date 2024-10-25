const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

exports.sendVerificationEmail = async (email, token) => {
    const verificationLink = `${process.env.BASE_URL}/verify-email?token=${token}`;
    
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Verify your email',
            html: `<p>Please verify your email by clicking <a href="${verificationLink}">here</a></p>`
        });
        console.log(`Verification email sent to ${email}`);
    } catch (error) {
        console.error('Error sending verification email:', error);
        throw new Error('Email sending failed');
    }
};

exports.sendResetEmail = async (email, token) => {
    const resetLink = `${process.env.BASE_URL}/reset-password?token=${token}`;
    
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset Request',
            html: `<p>You requested to reset your password. Click <a href="${resetLink}">here</a> to reset it</p>`
        });
        console.log(`Password reset email sent to ${email}`);
    } catch (error) {
        console.error('Error sending reset email:', error);
        throw new Error('Email sending failed');
    }
};
