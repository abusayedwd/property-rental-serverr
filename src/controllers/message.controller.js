const httpStatus = require("http-status");
const {messageService} = require("../services");
const catchAsync = require("../utils/catchAsync");
const response = require("../config/response");

 const sendMessage = catchAsync(async(req, res) => {
  
    const { receiver, text } = req.body;
    const sender = req.user.id;

    const message = await messageService.sendMessage(sender, receiver, text);
    res.status(httpStatus.CREATED).json(
      response({
        message : "Chat created successfully" ,
        status: "OK",
        statusCode: httpStatus.CREATED,
        data: message,
      })
    );
 
})

 const getMessages = catchAsync(async(req, res) => {
  
    const { chatId } = req.params;
    const messages = await messageService.getMessages(chatId);
    res.status(httpStatus.OK).json(
      response({
          message: " Chat retrieved successfully",
          status: "OK",
          statusCode: httpStatus.OK,
          data: messages,
      })
  );
 
})

 const updateMessage= catchAsync(async(req, res) => {
  
    const { messageId } = req.params;
    const { text } = req.body;
    const updatedMessage = await messageService.updateMessage(messageId, text);
    res.status(200).json(updatedMessage);
   
})

 const deleteMessage = catchAsync(async(req, res) => {
  
    const { messageId } = req.params;
    await messageService.deleteMessage(messageId);
    res.status(200).json({ message: "Message deleted successfully" });
   
})

module.exports = { sendMessage, 
  getMessages, 
  updateMessage, 
  deleteMessage 
};
