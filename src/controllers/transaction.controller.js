const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const httpStatus = require("http-status");
const response = require("../config/response");
const { Property, User } = require("../models");
const Transaction = require("../models/transaction.model"); 
const catchAsync = require("../utils/catchAsync");
const { HttpStatusCode } = require("axios");
const { pick } = require("lodash");
const paymentModel = require("../models/payment.model");
// const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
require("dotenv").config();
 

const createPromotionPayment = catchAsync (async(  req, res) => {
  
    const landlordId = req.user.id; // Assumed user info is in req.user
    const { propertyId,  } = req.body; // Assuming propertyId is passed in the request

    // Validate required fields
    if (!propertyId) {
      return res.status(400).json({ message: "Property ID is required" });
    }

    // Set the default item(s) for the promotion (assuming the price is $2)
    const items = [
      {
        name: 'Property Promotion', // Name of the promotion
        quantity: 1, // 1 quantity for the promotion
      },
    ];

    // Price is $2 (in cents, so 2 * 100 = 200 cents)
    const amount = 29; 

    // Create the Stripe Checkout session for payment of $2
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(amount * 100), // Convert amount to cents
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: "http://10.0.80.210:3004/",
      cancel_url: "http://10.0.80.210:3004/",
      customer_email: req.user.email, // Assuming the user's email is available in req.user
      metadata: {
        propertyId, // Store the property ID in metadata
        promotionAmount: (amount * 100).toString(), // Store the promotion amount in cents
      },
      shipping_address_collection: {
        allowed_countries: ["US", "GB", "BD", "CA"],
      },
    });

    const newPromotion = await Transaction.create({
      landlordId,
      propertyId,
      amount,
      promotionStatus: "pending", // Initially set the promotion as pending
      stripeSessionId: session.id, // Store Stripe session ID for reference
      transactionId: session.payment_intent
    });

    res.status(200).json({
      status: 200,
      message: "Property promotion payment created successfully.",
      promotion: newPromotion,
      sessionId: session.id,
      url: session.url // Return the session ID for frontend use
    });
  
});



const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  try {
    let event;

    if (!endpointSecret) {
        throw new Error("Stripe webhook secret not configured.");
    }

    event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
    console.log("Webhook verified.");

    const data = event.data.object;
    const eventType = event.type;

    console.log(`Received event type: ${eventType}`);

    // Handle successful payment event
    if (eventType === 'checkout.session.completed') {
      const session = event.data.object; // Get session details

      console.log('Payment successfully completed. Session details:', session);

      // Extract the propertyId from session metadata (assuming it's there)
      const { propertyId } = session.metadata;

      // Find and update the property by the property ID
      const updatedProperty = await Property.findByIdAndUpdate(
        propertyId,
        { isPromotion: true }, // Set promotion to true after successful payment
        { new: true } // Return the updated property document
      );

      if (!updatedProperty) {
        console.log('Property not found for ID:', propertyId);
        return res.status(404).json({ error: 'Property not found' });
      }

      console.log('Promotion activated for property:', updatedProperty);

      // Optionally, you can also update the promotion status in the subscription or transaction model
      const updatedPromotion = await Transaction.findOneAndUpdate(
        { stripeSessionId: session.id }, // Filter condition
        { 
          transactionId: session.payment_intent, // Fields to update
          promotionStatus: 'active'
        }, 
        { new: true }
      );

      console.log('Transaction promotion status updated:', updatedPromotion);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Error in webhook handler:', error.message);
    res.status(500).json({ error: 'Webhook error' });
  }
};


const getPromotionStatus = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["fullName", "role", "email"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);

  // Set default values for pagination
  const limit = options.limit ? parseInt(options.limit, 10) : 10; // Default to 10 items per page
  const page = options.page ? parseInt(options.page, 10) : 1; // Default to page 1

  const skip = (page - 1) * limit;

  console.log(`skip: ${skip}, limit: ${limit}`); // Debugging log

  // Fetch active promotions with pagination, sorted by most recent promotion first
  const promotion = await Transaction.find({ 
    promotionStatus: 'active',
    ...filter // Apply any additional filters like fullName, role, or email
  })
  .skip(skip)
  .limit(limit)
  .populate("landlordId")
  .sort({ createdAt: -1 }); // Sort by createdAt in descending order to get the most recent first

  console.log('Promotion:', promotion); // Debugging log

  if (!promotion || promotion.length === 0) {
    return res.status(404).json({ message: "No active promotion found." });
  }

  // Get the total count of active promotions to calculate total pages
  const totalResults = await Transaction.countDocuments({ promotionStatus: 'active', ...filter });
  const totalPages = Math.ceil(totalResults / limit);

  res.status(httpStatus.OK).json(
    response({
      message: "Transaction retrieved successfully",
      status: "OK",
      statusCode: httpStatus.OK,
      data: promotion,
      pagination: {
        page: page, // Current page
        limit: limit, // Items per page
        totalPages: totalPages, // Total number of pages
        totalResults: totalResults // Total number of results
      }
    })
  );
});




const totalStatus = catchAsync(async( req, res) => {


  const users = await User.countDocuments({role: "user"}) 
  const landLord = await User.countDocuments({role: "landlord"})

  const totalEarnings = await paymentModel.find({status: "success"}, "amount");  

  // Calculate the total earnings
  const totalAmount = totalEarnings.reduce((acc, cur) => acc + cur.amount, 0);

   
  const data = {
    users,
    landLord,
    totalAmount
  }

  res
  .status(httpStatus.OK).json(response({
    message: "total status get successfully",
    statusCode: httpStatus.OK,
    data
  }))
})


const adminEarining =  catchAsync (async(  req, res) => {
  
  const admin = req.user.role;

  if (admin !== "admin") {
    return res.status(400).json(
      Response({
        status: "error",
        statusCode: 400,
        message: "You are not an admin.",
      })
    );
  }

  const { year } = req.query; // Get the year from the query params
  if (!year || isNaN(year)) {
    return res.status(400).json(
     response({
        status: "error",
        statusCode: 400,
        message: "Please provide a valid year.",
      })
    );
  }

  // Define all months with initial earnings set to 0
  const allMonths = {
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0,
  };

  // Get all subscriptions paid in the specified year
  const earnings = await  paymentModel.find({
    status: "success",
    createdAt: {
      $gte: new Date(`${year}-01-01`),
      $lt: new Date(`${parseInt(year) + 1}-01-01`),
    },
  });

  // Helper function to get month abbreviation
  const getMonthAbbreviation = (date) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return monthNames[new Date(date).getMonth()];
  };

  // Aggregate earnings by month
  earnings.forEach((transaction) => {
    const month = getMonthAbbreviation(transaction.createdAt);
    allMonths[month] += transaction.amount;
  });

  // Format the response as an array of objects
  const formattedResponse = Object.keys(allMonths).map((month) => ({
    month,
    totalEarnings: allMonths[month].toFixed(2), // Format to 2 decimal places
  }));

  return res.status(200).json(
    response({
      status: "success",
      statusCode: 200,
      message: `Yearly earnings for ${year} by month`,
      data: formattedResponse,
    })
  );

});




module.exports = {
  totalStatus,
  adminEarining,
  createPromotionPayment,
  getPromotionStatus,
  stripeWebhook
};
