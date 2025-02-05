
const express = require("express");
const auth = require("../../middlewares/auth"); 
const propertyController = require("../../controllers/property.controller");
const userFileUploadMiddleware = require("../../middlewares/fileUpload");
const convertHeicToPngMiddleware = require("../../middlewares/converter");
const UPLOADS_FOLDER_USERS = "./public/uploads/property";

const uploadUsers = userFileUploadMiddleware(UPLOADS_FOLDER_USERS);

const router = express.Router();


router.get('/getAllProperties', auth('common'), propertyController.getAllProperties)
router.get('/getPromotedProperties', auth('common'), propertyController.getPromotedProperties)
router.get('/getMyProperty', auth('common'), propertyController.getMyProperty)
// router.get('/:id', auth('common'), propertyController.getPropertyById)

router.post('/createProperty',auth("landlord"), 
[uploadUsers.single("image")],
convertHeicToPngMiddleware(UPLOADS_FOLDER_USERS),
propertyController.createProperty);

router
  .route("/:id")
  .get(auth("common"),propertyController.getPropertyById)
  .patch(
    auth("landlord"),
    [uploadUsers.single("image")],
    convertHeicToPngMiddleware(UPLOADS_FOLDER_USERS),
    propertyController.updateProperty 
  )
  .delete(auth('landlord'), propertyController.deleteProperty)
 

module.exports = router;
