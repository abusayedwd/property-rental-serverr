const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
    landlordId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: false },
    email: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "NGN" },
    status: { type: String, default: "pending" }, // pending, success, failed
    reference: { type: String, unique: true },
    transactionId: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Payment", PaymentSchema);
