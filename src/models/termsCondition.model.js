const mongoose = require('mongoose');

const TermsConditionUsSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        default: "TermsCondition"
    }
}, 
{ timestamps: true }
);

const TermsCondition = mongoose.model('TermsCondition', TermsConditionUsSchema);

module.exports = TermsCondition;