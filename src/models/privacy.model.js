const mongoose = require('mongoose');

const privacySchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        default: "privacy policy text"
    }
}, 
{ timestamps: true }
);

const PrivacyPolicy = mongoose.model('PrivacyPolicy', privacySchema);

module.exports = PrivacyPolicy;