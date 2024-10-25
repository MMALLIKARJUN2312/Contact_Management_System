const multer = require('multer');
const path = require('path');
const fs = require('fs');
const parseCSV = require('../utils/csvParser');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    },
});

const upload = multer({ storage });

const handleCSVUpload = async (filePath) => {
    const records = await parseCSV(filePath);
    return records;
};

module.exports = {
    upload,
    handleCSVUpload,
};
