const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const propertySchema = new mongoose.Schema(
  {
    landlordId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    houseName: { type: String, required: true },
    textArea: { type: String, required: true },
    date: { type: String, required: true },
    place: { type: String, required: true },
    propertyType: { type: String, enum: ["sell", "rent", "sold","rented"], required: true },
    type: { type: String, required: true },
    rooms: { type: Number, required: true },
    baths: { type: Number, required: true },
    price: { type: Number, required: true },
    state: { type: String },
    subState: { type: String },
    isPromotion: { 
      type: Boolean,
      default: false // Default value is false
    },
    images: {
      type: [
        {
          url: {
            type: String, 
            required: true,
          },
          path: {
            type: String,
            required: true, 
          },
        },
      ],
      required: [true, "Image is must be Required"],
      default: [{ url: `/uploads/property/user.png`, path: "null" }],
    },
   
  },
  { timestamps: true }
);

propertySchema.plugin(toJSON); 
propertySchema.plugin(paginate); 

module.exports = mongoose.model("Property", propertySchema);
 