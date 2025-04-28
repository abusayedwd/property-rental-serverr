const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const {totalStatus, adminEarining, stripeWebhook, createPromotionPayment, getPromotionStatus, getPaymentHistory } = require('../../controllers/transaction.controller');
const bodyParser = require("body-parser");
 

// Webhook route to handle payment success
router.post('/stripe-webhook', bodyParser.raw({ type: "application/json" }), stripeWebhook);

// Other routes
router.post('/pay', auth('landlord'), createPromotionPayment);
router.get("/getPaymentHistory", auth('common'), getPaymentHistory);
router.get('/totalStatus', auth('common'), totalStatus);
router.get('/monthlyEarning', auth('admin'), adminEarining);

//paystack payment Route //

// router.post("/pay",  auth('landlord'), initializePayment); 
// router.get("/verify/:reference", auth('landlord'), verifyPayment);
// router.get("/getPaymentHistory", auth('common'), getPaymentHistory);
// router.post("/webhook",  paystackWebhook);

module.exports = router;





// const express = require('express');
// const router = express.Router();
// const auth = require('../../middlewares/auth');
// const {totalStatus, adminEarining, stripeWebhook, createPromotionPayment, getPromotionStatus } = require('../../controllers/transaction.controller');
// const bodyParser = require("body-parser");
// // const { initializePayment, verifyPayment, paystackWebhook, getPaymentHistory } = require('../../controllers/payment.controller');

// // Webhook route to handle payment success
// router.post('/pay', auth('landlord'), createPromotionPayment);

// router.post('/webhook', bodyParser.raw({ type: "application/json" }), stripeWebhook);

// // Other routes
// router.get('/getPaymentHistory', auth('common'), getPromotionStatus);

// router.get('/totalStatus', auth('common'), totalStatus);
// router.get('/monthlyEarning', auth('admin'), adminEarining);

// //paystack payment Route //

// // router.post("/pay",  auth('landlord'), initializePayment); 
// // router.get("/verify/:reference", auth('landlord'), verifyPayment);
// // router.get("/getPaymentHistory", auth('common'), getPaymentHistory);
// // router.post("/webhook",  paystackWebhook);

// module.exports = router;  