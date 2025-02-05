const {Messages} = require("../models");
const {  Chating} = require("../models");
const {chatService} = require("../services");

 const sendMessage = async(sender, receiver, text) => {
  const chat = await chatService.createChat(sender, receiver);

  const message = await Messages.create({
    chatId: chat._id,
    sender,
    receiver,
    text,
  });

  await Chating.findByIdAndUpdate(chat._id, { lastMessage: message._id });

  return message;
}

 const getMessages = async(chatId) => {
  return await Messages.find({ chatId })
    .populate({
      path: "sender receiver",
      select: "fullName image role email",
    })
    
}


 const updateMessage = async(messageId, text) => {
  return await Messages.findByIdAndUpdate(messageId, { text }, { new: true });
}

 const deleteMessage = async(messageId) => {
  return await Messages.findByIdAndDelete(messageId);
}

module.exports = { 
  sendMessage, 
  getMessages, 
  updateMessage, 
  deleteMessage 
};
