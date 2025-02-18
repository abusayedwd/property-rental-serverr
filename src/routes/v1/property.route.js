
const express = require("express");
const auth = require("../../middlewares/auth"); 
const propertyController = require("../../controllers/property.controller");
const userFileUploadMiddleware = require("../../middlewares/fileUpload");
const convertHeicToPngMiddleware = require("../../middlewares/converter");
const UPLOADS_FOLDER_USERS = "./public/uploads/property";

const uploadUsers = userFileUploadMiddleware(UPLOADS_FOLDER_USERS);

const router = express.Router();


router.get('/getAllProperties',  propertyController.getAllProperties)
router.get('/getPromotedASellProperties', propertyController.getPromotedASellProperties)
router.get('/getPromotedARentProperties', propertyController.getPromotedARentProperties)
router.get('/getMyProperty', auth('common'), propertyController.getMyProperty)
// router.get('/:id', auth('common'), propertyController.getPropertyById)

// router.post('/createProperty',auth("landlord"), 
// [uploadUsers.single("image")],
// convertHeicToPngMiddleware(UPLOADS_FOLDER_USERS),
// propertyController.createProperty);

router.post('/createProperty', auth("landlord"), 
[uploadUsers.array("images", 5)], // Allow 1 to 5 images
convertHeicToPngMiddleware(UPLOADS_FOLDER_USERS),
propertyController.createProperty);

router
  .route("/:id")
  .get( propertyController.getPropertyById)
  .patch(
    auth("landlord"),
    [uploadUsers.single("image")],
    convertHeicToPngMiddleware(UPLOADS_FOLDER_USERS),
    propertyController.updateProperty 
  )
  .delete(auth('landlord'), propertyController.deleteProperty)
 

module.exports = router;
