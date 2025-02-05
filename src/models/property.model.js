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
    address: { type: String, required: true },
    propertyType: { type: String, enum: ["sell", "rent"], required: true },
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
    image: {
        type: Object,
        required: [true, "Image is must be Required"],
        default: { url: `/uploads/property/user.png`, path: "null" },
      },
   
  },
  { timestamps: true }
);

propertySchema.plugin(toJSON);
propertySchema.plugin(paginate);

module.exports = mongoose.model("Property", propertySchema);
