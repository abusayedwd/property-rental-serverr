const axios = require("axios");
const Payment = require("../models/payment.model");
const { Property } = require("../models");
const response = require("../config/response");
const httpStatus = require("http-status");
require("dotenv").config();

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

// 💳 Step 1: Initialize Payment
exports.initializePayment = async (req, res) => {

    const landlordId = req.user.id;
    const email = req.user.email;

    const amount = 3000;

    try {
        const {  propertyId } = req.body;
        const reference = `txn_${Date.now()}`;

        const response = await axios.post(
            "https://api.paystack.co/transaction/initialize",
            {
                email,
                amount: amount * 100 , // Convert to kobo
                currency: "NGN",
                reference,
                propertyId,
                landlordId,
                callback_url: `http://localhost:3004/myproperty?reference=${reference}`, 
            },
            {
                headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` }, 
            }
        );

        // Save transaction details in DB
        const newPayment = new Payment({
            email,
            amount,
            reference,
            propertyId,
            status: "pending",
            landlordId
        });
        await newPayment.save();

        res.json({ status: true, data: newPayment, authorizationUrl: response.data.data.authorization_url, });
    } catch (error) {
        res.status(500).json({ status: false, message: error.response?.data || error.message });
    }
};

// ✅ Step 2: Verify Payment
exports.verifyPayment = async (req, res) => {
    try {
        const { reference } = req.params;

        const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
            headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` },
        });

        if (response.data.data.status === "success") {
            await Payment.findOneAndUpdate(
                { reference },
                { status: "success", transactionId: response.data.data.id },
                { new: true }
            );
            res.json({ status: true, message: "Payment successful!", data: response.data.data });
        } else {
            res.json({ status: false, message: "Payment failed!" });
        }
    } catch (error) {
        res.status(500).json({ status: false, message: "Error verifying payment" });
    }
};

// 🔄 Step 3: Handle Paystack Webhook
exports.paystackWebhook = async (req, res) => {
    try {
        const event = req.body;
        console.log("Webhook Event Received:", event);

        if (event.event === "charge.success") {
            const payment = await Payment.findOne({ reference: event.data.reference });

            if (!payment) {
                console.log("Payment record not found for reference:", event.data.reference);
                return res.status(404).json({ error: "Payment record not found" });
            }

            payment.status = "success";
            payment.transactionId = event.data.id;
            await payment.save();

            const propertyId = payment.propertyId;
            const updatedProperty = await Property.findByIdAndUpdate(
                propertyId,
                { isPromotion: true },
                { new: true }
            );

            if (!updatedProperty) {
                console.log("Property not found for ID:", propertyId);
                return res.status(404).json({ error: "Property not found" });
            }

            console.log("Promotion activated for property:", updatedProperty);

            // ✅ Redirect to success page
            res.redirect(`http://localhost:3004/myproperty?reference=${payment.reference}`);
        } else {
            res.sendStatus(200);
        }
    } catch (error) {
        console.error("Webhook error:", error);
        res.sendStatus(500);
    }
};


exports.getPaymentHistory = async (req, res) => {
    try {
        const payments = await Payment.find().populate('landlordId')
            .sort({ paymentDate: -1 });
            res.status(httpStatus.OK).json(
                response({
                  message: "PaymentHistory retrieved successfully",
                  status: "OK",
                  statusCode: httpStatus.OK,
                  data: payments, 
                })
              );

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch payment history' });
    }
};
