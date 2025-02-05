 
const {AboutModel,
     PrivacyModel, 
     TermsConditionModel
    } = require('../models');


// Function to get the About Us text
const getText = async () => {
    return await AboutModel.findOne();
};

// Function to update the About Us text
const updateText = async (text) => {
    let aboutUs = await AboutModel.findOne();
    if (aboutUs) {
        aboutUs.text = text;
        await aboutUs.save();
    } else {
        aboutUs = new AboutModel({ text });
        await aboutUs.save();
    }
    return aboutUs;
};

const getPrivacy = async () => {
    return await PrivacyModel.findOne();
};

// Function to update the About Us text
const updatePrivacy = async (text) => {
    let privacy = await PrivacyModel.findOne();
    if (privacy) {
        privacy.text = text;
        await privacy.save();
    } else {
        privacy = new PrivacyModel({ text });
        await privacy.save();
    }
    return privacy;
};

const getTermsCondition = async () => {
    return await TermsConditionModel.findOne();
};

// Function to update the About Us text
const updateTerms = async (text) => {
    let aboutUs = await TermsConditionModel.findOne();
    if (aboutUs) {
        aboutUs.text = text;
        await aboutUs.save();
    } else {
        aboutUs = new TermsConditionModel({ text });
        await aboutUs.save();
    }
    return aboutUs;
};


module.exports = { 
    getText, 
    updateText,
    getPrivacy,
    updatePrivacy,
    updateTerms,
    getTermsCondition 
};