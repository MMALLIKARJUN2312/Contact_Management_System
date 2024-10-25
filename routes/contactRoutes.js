const express = require('express');
const router = express.Router();
const { addContact, getContacts, updateContact, deleteContact, batchUpload } = require('../controllers/contactController');
const { authenticate } = require('../middleware/authMiddleware');

router.post('/add', authenticate, addContact);
router.get('/', authenticate, getContacts);
router.put('/update/:id', authenticate, updateContact);
router.delete('/delete/:id', authenticate, deleteContact); 
router.post('/upload/batch', authenticate, batchUpload); 

module.exports = router;
