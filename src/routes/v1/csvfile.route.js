 

// const express = require('express');
// const router = express.Router();
 
// const uploader = require('../../middlewares/fileUpload');
// const { handleFileUpload, getRevoultPayments, getPaymentStats, deleteRevoultPayment, editPayment } = require('../../controllers/csvfile.controller');

// // Use the uploader middleware for CSV file upload
// const uploadMiddleware = uploader('uploads/csv'); 

// // Route for uploading CSV file
// router.post('/upload', uploadMiddleware.single('csvFile'), handleFileUpload);  

// // Route for getting all payments
// router.get('/getRevoultPayments', getRevoultPayments);
// router.put('/editPayment/:paymentId', editPayment);
// router.get('/getPaymentStats', getPaymentStats);
// router.get('/getPaymentStats', getPaymentStats);
// router.delete('/deleteRevoultPayment/:id', deleteRevoultPayment);  

// module.exports = router;