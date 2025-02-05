const httpStatus = require("http-status");
const {chatService} = require("../services");
const catchAsync = require("../utils/catchAsync");
const response = require("../config/response");

const createChat = catchAsync(async (req, res) => {
  const userId = req.user.id;  

  const { senderId } = req.body;   
  const chat = await chatService.createChat(userId, senderId);
 

  res.status(httpStatus.CREATED).json(
    response({
      message : "Chat created successfully" ,
      status: "OK",
      statusCode: httpStatus.CREATED,
      data: chat,
    })
  );
});


 const getChats = catchAsync(async(req, res) => {
 
    const id = req.user.id;
   
    const chats = await chatService.getUserChats(id);
    res.status(httpStatus.OK).json(
      response({
          message: " Chat retrieved successfully",
          status: "OK",
          statusCode: httpStatus.OK,
          data: chats,
      })
  );
 
})

 const deleteChat = catchAsync(async( req, res) => { 
 
    const  {chatId } = req.params;
    await chatService.deleteChat(chatId);
    res.status(200).json({ message: "Chat deleted successfully" });
  
})

module.exports = { createChat, getChats, deleteChat };
