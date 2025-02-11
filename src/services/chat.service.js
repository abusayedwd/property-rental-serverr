const { Chating} = require("../models");

async function createChat(userId, senderId) {
  const existingChat = await Chating.findOne({ participants: { $all:  [userId, senderId]}});
  if (existingChat) return existingChat;

  const newChat = new Chating({ 
    participants: [userId, senderId],  
    receiver: senderId,
  });

  await newChat.save()
  return newChat
}

async function getUserChats(userId) {
  // return await Chating.find({ participants: userId }).populate("participants lastMessage");
  return await Chating.find({ participants: userId })
  .populate("participants", "fullName  email role image") 
  .populate("receiver", "fullName email role image");
}

async function deleteChat(chatId) {
  return await Chating.findByIdAndDelete(chatId); 
}

module.exports = { 
    createChat, 
    getUserChats, 
    deleteChat 
  };


 