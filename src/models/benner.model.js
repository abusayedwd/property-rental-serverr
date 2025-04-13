const mongoose = require("mongoose");

const BannerSchema = new mongoose.Schema({
//   title: { type: String, required: true },
  image: {
    url: { type: String, required: true },
    path: { type: String, required: true },
  },
  link: { type: String,  
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Banner", BannerSchema);
