


const express = require('express');
const router = express.Router();
 
const auth = require('../../middlewares/auth');
const { createSubscription, getSubscription } = require('../../controllers/transaction.controller');


// Route to get About Us text
router.post('/createSubscription', auth('landlord'), createSubscription);  
router.get('/getSubscription', auth('landlord'), getSubscription);  
 


module.exports = router;