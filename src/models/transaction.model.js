  
const mongoose = require('mongoose');
 

const transactionSchema = new mongoose.Schema(
 
  {
    landlordId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: false },

    // timeDuration: { type: Number, required: true },
    amount: { type: Number, required: true },
    transactionId: { type: String, required: false },
    paymentMethod: { type: String, required: false },
    status: { type: String, enum: ['success', 'failed'], default: 'success' },
    currency: { type: String, required: false, default: 'USD' }, 
    promotionStatus: { type: String, required: false,}, 
    stripeSessionId : { type: String, required: false,  }, 
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`.
  }
);
 

module.exports = mongoose.model('Transaction', transactionSchema);

 
