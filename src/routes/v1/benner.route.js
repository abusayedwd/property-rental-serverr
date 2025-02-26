

const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const userFileUploadMiddleware = require("../../middlewares/fileUpload");
const convertHeicToPngMiddleware = require("../../middlewares/converter");
const { addBanner, deleteBanner, getBannerById, updateBanner, getBanners } = require("../../controllers/benner.controller");
const UPLOADS_FOLDER_USERS = "./public/uploads/users";

const uploadUsers = userFileUploadMiddleware(UPLOADS_FOLDER_USERS);

const router = express.Router();
 
 


router.post("/addbanner",
    auth("admin"),
    [uploadUsers.single("image")],
    convertHeicToPngMiddleware(UPLOADS_FOLDER_USERS),
     addBanner
  );
  router.get("/" ,getBanners);
  router.delete("/:id", deleteBanner);

router
  .route("/:id")
  .get(auth("common"),  getBannerById)
  .put(
    auth("common"),
    [uploadUsers.single("image")],
    convertHeicToPngMiddleware(UPLOADS_FOLDER_USERS),
    updateBanner
  );
 

module.exports = router;