const moment = require('moment-timezone');

exports.convertToUserTimezone = (contact) => {
    const timezone = contact.timezone || 'UTC';
    contact.createdAt = moment(contact.createdAt).tz(timezone).format('YYYY-MM-DD HH:mm:ss');
    contact.updatedAt = moment(contact.updatedAt).tz(timezone).format('YYYY-MM-DD HH:mm:ss');
    return contact;
};
