const mongoose = require('mongoose');

const contactSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        }
    }
)

const contactModel = mongoose.model('Contact', contactSchema);

module.exports = contactModel;