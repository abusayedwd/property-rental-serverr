  
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const transactionSchema = new mongoose.Schema(
  {
    landlordId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: false },

    timeDuration: { type: Number, required: true },
    amount: { type: Number, required: true },
    transactionId: { type: String, required: false },
    paymentMethod: { type: String, required: false },
    status: { type: String, enum: ['success', 'failed'], default: 'success' },
    currency: { type: String, required: false, default: 'USD' }, 
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`.
  }
);

// Add plugins
transactionSchema.plugin(toJSON);
transactionSchema.plugin(paginate);

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
