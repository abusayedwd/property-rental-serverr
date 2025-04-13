const mongoose = require('mongoose');

const contactInfoSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const ContactInfo = mongoose.model('ContactInfo', contactInfoSchema);

module.exports = ContactInfo;
