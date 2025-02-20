// const express = require('express');
// const router = express.Router();
// const auth = require('../../middlewares/auth');
// const { createPromotionPayment, stripeWebhook, getPromotionStatus } = require('../../controllers/transaction.controller');
// const bodyParser = require('body-parser');

// router.post('/create-promotion-payment', auth('landlord'), createPromotionPayment);

// // Webhook route to handle payment success
// router.post('/stripe-webhook', bodyParser.raw({ type: 'application/json' }), stripeWebhook);

// // Route for getting active promotion status
// router.get('/getPromotionPayment', auth('common'), getPromotionStatus);

// module.exports = router;




const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const { createPromotionPayment, stripeWebhook, getPromotionStatus, totalStatus, adminEarining } = require('../../controllers/transaction.controller');
const bodyParser = require("body-parser");

// Webhook route to handle payment success
router.post('/stripe-webhook', bodyParser.raw({ type: "application/json" }), stripeWebhook);

// Other routes
router.post('/create-promotion-payment', auth('landlord'), createPromotionPayment);
router.get('/getPromotionPayment', auth('common'), getPromotionStatus);
router.get('/totalStatus', auth('common'), totalStatus);
router.get('/monthlyEarning', auth('admin'), adminEarining);

module.exports = router;  