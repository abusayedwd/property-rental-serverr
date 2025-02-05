
const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const chatSchema = new mongoose.Schema(
  {
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }],
    lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

chatSchema.plugin(toJSON);
chatSchema.plugin(paginate);

module.exports = mongoose.model("Chat", chatSchema);
