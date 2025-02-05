

const express = require("express");
const auth = require("../../middlewares/auth"); 
const { chatingController } = require("../../controllers");
 

const router = express.Router();

router.post("/create",auth('common'), chatingController.createChat);
router.get("/getChatlist",auth('common'), chatingController.getChats);
router.delete("/:chatId", auth('common'), chatingController.deleteChat);
// router.get('/:id', auth('common'), propertyController.getPropertyById)
 
 

module.exports = router;


 