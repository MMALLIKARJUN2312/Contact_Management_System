const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.authenticate = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token after 'Bearer'
    if (!token) return res.status(401).json({ message: "Access denied" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findByPk(decoded.id);
        if (!req.user) return res.status(401).json({ message: "Invalid token" });

        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token", error });
    }
};


