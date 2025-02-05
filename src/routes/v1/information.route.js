
const express = require('express');
const router = express.Router();
const{ informaionController} = require('../../controllers');
const auth = require('../../middlewares/auth');


// Route to get About Us text
router.get('/getAbout', auth('common'),  informaionController.getAboutUs); 
router.patch('/updateAbout', informaionController.updateAboutUs);

//privacy tex
router.get('/getPrivacy',auth('common'), informaionController.getPrivacy); 
router.patch('/updatePrivacy',auth('admin'), informaionController.updatePrivacy);

//termsCondition 
router.get('/getTermsCondition',auth('common'), informaionController.getTermsCondition); 
router.patch('/updateTermsCondition',auth('admin'), informaionController.updateTerms);


module.exports = router;