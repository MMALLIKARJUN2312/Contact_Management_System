const Contact = require('../models/contact');
const { convertToUserTimezone } = require('../utils/timeConverter');

exports.addContact = async (req, res) => {
    const { name, email, phone, address, timezone } = req.body;
    try {
        const contact = await Contact.create({
            userId: req.user.id,
            name,
            email,
            phone,
            address,
            timezone,
        });
        res.status(201).json(contact);
    } catch (error) {
        res.status(500).json({ message: "Contact creation failed", error });
    }
};

exports.getContacts = async (req, res) => {
    const { name, email, timezone } = req.query;
    try {
        let filter = { userId: req.user.id, isDeleted: false };
        if (name) filter.name = name;
        if (email) filter.email = email;
        if (timezone) filter.timezone = timezone;

        const contacts = await Contact.findAll({ where: filter });
        const contactsWithTimezones = contacts.map(contact => convertToUserTimezone(contact));
        res.json(contactsWithTimezones);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve contacts", error });
    }
};

exports.updateContact = async (req, res) => {
    const { id } = req.params;
    try {
        const contact = await Contact.findByPk(id);
        if (!contact || contact.isDeleted) return res.status(404).json({ message: "Contact not found" });

        await contact.update(req.body);
        res.json({ message: "Contact updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Contact update failed", error });
    }
};

exports.deleteContact = async (req, res) => {
    const { id } = req.params;
    try {
        const contact = await Contact.findByPk(id);
        if (!contact || contact.isDeleted) return res.status(404).json({ message: "Contact not found" });

        contact.isDeleted = true;
        await contact.save();
        res.json({ message: "Contact deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Deletion failed", error });
    }
};

exports.batchUpload = async (req, res) => {
    const contacts = req.body;

    if (!Array.isArray(contacts)) {
        return res.status(400).json({ message: "Invalid input format, expected an array of contacts." });
    }

    const createdContacts = [];
    for (const contactData of contacts) {
        try {
            const contact = await Contact.create({
                userId: req.user.id,
                ...contactData,
            });
            createdContacts.push(contact);
        } catch (error) {
            console.error('Error creating contact:', error);
            return res.status(500).json({ message: "Batch processing failed", error });
        }
    }

    res.status(201).json({
        message: "Contacts uploaded successfully",
        contacts: createdContacts,
    });
};

