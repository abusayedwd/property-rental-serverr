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
const {totalStatus, adminEarining } = require('../../controllers/transaction.controller');
const bodyParser = require("body-parser");
// const { initializePayment, verifyPayment, paystackWebhook, getPaymentHistory } = require('../../controllers/payment.controller');
const { createPromotionPayment, stripeWebhook, getPromotionStatus } = require('../../controllers/transaction.controller');
// Webhook route to handle payment success
router.post('/stripe-webhook', bodyParser.raw({ type: "application/json" }), stripeWebhook);
router.get("/getPaymentHistory", auth('common'), getPromotionStatus);
// Other routes
router.post('/pay', auth('landlord'), createPromotionPayment);
// router.get('/getPromotionPayment', auth('common'), getPromotionStatus);
router.get('/totalStatus', auth('common'), totalStatus);
router.get('/monthlyEarning', auth('admin'), adminEarining);

//paystack payment Route //

// router.post("/pay",  auth('landlord'), initializePayment); 
// router.get("/verify/:reference", auth('landlord'), verifyPayment);
// router.get("/getPaymentHistory", auth('common'), getPaymentHistory);
// router.post("/webhook",  paystackWebhook);

module.exports = router;  