 
const httpStatus = require('http-status');
const {informationService} = require('../services');
const response = require('../config/response');
 

// Function to get About Us text
const getAboutUs = async (req, res) => {
    try {
        const aboutUs = await informationService.getText();
        console.log("abouttt>>>>>:77",aboutUs)
        if (aboutUs) {
            res.status(httpStatus.OK).json(
                response({
                  message: "About Us text fetch successfully",
                  status: "OK",
                  statusCode: httpStatus.OK,
                  data: aboutUs,
                })
              );
        } else {
            res.status(404).json({ message: 'About Us text not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Function to update About Us text

const updateAboutUs = async (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ message: 'Text is required' });
    }

    try {
        const updatedAboutUs = await informationService.updateText(text);
        res.status(httpStatus.OK).json(
            response({
              message: "About Us text updated successfully",
              status: "OK",
              statusCode: httpStatus.OK,
              data: updatedAboutUs,
            })
          );
        
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getPrivacy = async (req, res) => {
    try {
        const privacy = await informationService.getPrivacy();
        // console.log("abouttt>>>>>:77",aboutUs)
        if (privacy) {
            res.status(httpStatus.OK).json(
                response({
                  message: "Privacy & Policy Us text fetch successfully",
                  status: "OK",
                  statusCode: httpStatus.OK,
                  data: privacy,
                })
              );
        } else {
            res.status(404).json({ message: 'Privacy Us text not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Function to update About Us text

const updatePrivacy = async (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ message: 'Text is required' });
    }

    try {
        const updatePrivacy = await informationService.updatePrivacy(text);
        res.status(httpStatus.OK).json(
            response({
              message: "Privacy text updated successfully",
              status: "OK",
              statusCode: httpStatus.OK,
              data: updatePrivacy,
            })
          );
        
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getTermsCondition = async (req, res) => {
    try {
        const privacy = await informationService.getTermsCondition();
        // console.log("abouttt>>>>>:77",aboutUs)
        if (privacy) {
            res.status(httpStatus.OK).json(
                response({
                  message: " Terms & Condition text fetch successfully",
                  status: "OK",
                  statusCode: httpStatus.OK,
                  data: privacy,
                })
              );
        } else {
            res.status(404).json({ message: 'Privacy Us text not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Function to update About Us text

const updateTerms = async (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ message: 'Text is required' });
    }

    try {
        const updatePrivacy = await informationService.updateTerms(text);
        res.status(httpStatus.OK).json(
            response({
              message: "Terms&Condition text updated successfully",
              status: "OK",
              statusCode: httpStatus.OK,
              data: updatePrivacy,
            })
          );
        
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



module.exports = { 
    getAboutUs, 
    updateAboutUs,
    getPrivacy,
    updatePrivacy ,
    getTermsCondition,
    updateTerms

};
