const Transaction = require('../models/transaction.model');

// const Stripe = require("stripe");
require('dotenv').config();
// const stripe = require("stripe")(process.env.STRIPE_API_KEY_SECRET);
 
 
 
// const User = require('../models/User');
// const endpointSecret=process.env.WEB_HOOK_SECRET

 
const createSubscription = async (req, res, next) => {
  try {
    const landlordId = req.user.id;
    const { amount, timeDuration } = req.body;

    // Validate required fields
    if (!amount || !timeDuration) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Calculate expiration date (months -> milliseconds)
    const expiresAt = new Date();
    expiresAt.setMonth(expiresAt.getMonth() + timeDuration);

    // Save subscription to database
    const newSubscription = await Transaction.create({
      landlordId,
      amount,
      timeDuration,
      expiresAt,
    });

    res.status(200).json({
      status: 200,
      message: "Subscription created successfully.",
      subscription: newSubscription,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

 

// const stripeWebhook = async (req, res) => {
//     try {
//       const sig = req.headers["stripe-signature"];
//       const endpointSecret = process.env.WEB_HOOK_SECRET;
  
//       let event;
  
//       try {
//         // Verify the Stripe webhook signature
//         event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
//       } catch (err) {
//         console.log("Stripe webhook signature verification failed:", err.message);
//         return res.status(400).json(`Webhook Error: ${err.message}`);
//       }
  
//       // Handle successful payment event
//       if (event.type === "checkout.session.completed") {
//         const session = event.data.object; // Get session details
  
//         console.log("Payment successfully completed. Session details:", session);
  
//         // Find and update the subscription by the Stripe session ID
//         const updatedSubscription = await Subscription.findOneAndUpdate(
//           { stripeSessionId: session.id },
//           { paymentStatus: "paid", isActive: true },
//           { new: true } // Return the updated subscription document
//         );
  
//         if (!updatedSubscription) {
//           console.log("Subscription not found for session ID:", session.id);
//           return res.status(404).json({ error: "Subscription not found" });
//         }
  
//         console.log("Subscription payment confirmed:", updatedSubscription);
  
//         // Update the user's subscription status
//         const userId = updatedSubscription.companyId; // Assuming `userId` is stored in the subscription document
//         await User.findByIdAndUpdate(
//           userId,
//           { isSubscribed: true },
//           { new: true } // Return the updated user document
//         );
  
//         console.log("User subscription status updated successfully for user ID:", userId);
//       }
  
//       res.status(200).json({ received: true });
//     } catch (error) {
//       console.error("Error in webhook handler:", error.message);
//       res.status(500).json({ error: "Webhook error" });
//     }
//   };
  
 
const getSubscription = async (req, res, next) => {
  try {
    const landlordId = req.user.id;

    // Fetch latest active subscription
    const subscription = await Transaction.findOne();

   

    res.status(200).json({
      status: 200,
      message: "Subscription retrieved successfully.",
      subscription,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};



module.exports = {
  createSubscription,
//   stripeWebhook, 
    getSubscription
};