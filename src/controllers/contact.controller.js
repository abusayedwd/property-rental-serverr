const httpStatus = require("http-status");
const ContactInfo = require("../models/contact.model");
const catchAsync = require("../utils/catchAsync");
const response = require("../config/response");

 

// Create new contact info
const createContactInfo = async (req, res) => {
  try {
    const { email, phone, address } = req.body;

    const newContactInfo = new ContactInfo({
      email,
      phone,
      address
    });

    await newContactInfo.save();
    res.status(201).json({ message: 'Contact information created successfully', data: newContactInfo });
  } catch (err) {
    res.status(500).json({ message: 'Error creating contact information', error: err.message });
  }
};

// Get all contact info
const getAllContactInfo = catchAsync(async (req, res) => {
 
    const contactInfos = await ContactInfo.find();
    res.status(httpStatus.OK).json(
        response({
            message: " Contact information retrieved successfully",
            status: "OK",
            statusCode: httpStatus.OK,
            data: contactInfos,
        })
    );
});

// Get a single contact info by ID
const getContactInfoById = async (req, res) => {
  try {
    const contactInfo = await ContactInfo.findById();
    if (!contactInfo) {
      return res.status(404).json({ message: 'Contact information not found' });
    }
    res.status(200).json({ data: contactInfo });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching contact information', error: err.message });
  }
};

// Update contact info by ID
const updateContactInfo = async (req, res) => {
    try {
      // Since you only have one record in the database, use the updateOne method
      const updatedContactInfo = await ContactInfo.findOneAndUpdate(
        {}, 
        req.body,  
        { new: true }  
      );
  
      if (!updatedContactInfo) {
        return res.status(404).json({  message: 'Contact information not found' });
      }
  
      res.status(200).json({
        message: 'Contact information updated successfully',
        code: 200,
        data: updatedContactInfo,
      });
    } catch (err) {
      res.status(500).json({
        message: 'Error updating contact information',
        error: err.message,
      });
    }
  };
  

// Delete contact info by ID
const deleteContactInfo = async (req, res) => {
  try {
    const contactInfo = await ContactInfo.findByIdAndDelete(req.params.id);
    if (!contactInfo) {
      return res.status(404).json({ message: 'Contact information not found' });
    }
    res.status(200).json({ message: 'Contact information deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting contact information', error: err.message });
  }
};

module.exports = {
  createContactInfo,
  getAllContactInfo,
  getContactInfoById,
  updateContactInfo,
  deleteContactInfo,
};
