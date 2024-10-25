const nodemailer = require('nodemailer');
const { EMAIL_USER, EMAIL_PASS } = process.env; // Ensure these variables are set in your .env file

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
});

const sendOtpEmail = async (email, otp) => {
    const mailOptions = {
        from: EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        html: `<p>Your OTP code is <strong>${otp}</strong>. It is valid for 5 minutes.</p>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`OTP sent to ${email}`);
    } catch (error) {
        console.error('Error sending OTP:', error);
        throw new Error('Failed to send OTP');
    }
};

module.exports = { sendOtpEmail };
