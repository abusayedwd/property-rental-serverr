
const express = require("express");
const auth = require("../../middlewares/auth"); 
const propertyController = require("../../controllers/property.controller");
const userFileUploadMiddleware = require("../../middlewares/fileUpload");
const convertHeicToPngMiddleware = require("../../middlewares/converter");
const { messagesController } = require("../../controllers");
 
 
const UPLOADS_FOLDER_USERS = "./public/uploads/property";

const uploadUsers = userFileUploadMiddleware(UPLOADS_FOLDER_USERS);

const router = express.Router(); 


router.post("/sendMessage",auth('common'), messagesController.sendMessage); 
router.get("/:chatId",auth('common'), messagesController.getMessages);
router.put("/:messageId",auth('common'), messagesController.updateMessage);
router.delete("/:messageId",auth('common'), messagesController.deleteMessage);
 
 
 
 

module.exports = router;  

 

