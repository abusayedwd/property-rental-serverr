
const express = require('express');
const { createContactInfo,getAllContactInfo, getContactInfoById, updateContactInfo, deleteContactInfo } = require('../../controllers/contact.controller');
const auth = require('../../middlewares/auth');
const router = express.Router();
 

// Create new contact info
router.post('/create-info', createContactInfo);

// Get all contact info
router.get('/',  getAllContactInfo);

// Get contact info by ID
router.get('/update',auth("common"),  getContactInfoById);

// Update contact info by ID
router.put('/update',auth("admin"),   updateContactInfo);

// Delete contact info by ID
router.delete('/contact-info/:id',  deleteContactInfo);

module.exports = router;
