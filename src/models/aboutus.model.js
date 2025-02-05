const mongoose = require('mongoose');

const aboutUsSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        default: "about heare "
    }
}, 
{ timestamps: true }
);

const AboutUs = mongoose.model('AboutUs', aboutUsSchema);

module.exports = AboutUs;