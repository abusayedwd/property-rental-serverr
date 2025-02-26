

const httpStatus = require("http-status");
const response = require("../config/response");
const Banner = require("../models/benner.model");
const catchAsync = require("../utils/catchAsync");

// ✅ Add Banner
const addBanner = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "Image is required" });

 
    const image = {
      url: "/uploads/users/" + req.file.filename,
      path: req.file.path,
    };

    const banner = new Banner({  image });
    await banner.save();

    res.status(201).json({ message: "Banner added successfully", banner , code: 200 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get All Banners
const getBanners = catchAsync (async (  req, res) => {  
    const banners = await Banner.find();  
    res.status(httpStatus.OK).json(
        response({
          message: "Banner retrieved successfully",
          status: "OK",
          statusCode: httpStatus.OK,
          data: banners,
        })
      );
});

// ✅ Get Banner by ID
const getBannerById = catchAsync (async (  req, res) => { 
 
    const banner = await Banner.findById(req.params.id);
    if (!banner) return res.status(404).json({ error: "Banner not found" });
    res.status(httpStatus.OK).json(
        response({
          message: "Single Banner retrieved successfully",
          status: "OK",
          statusCode: httpStatus.OK,
          data: banner, 
        })
      );
   
});

// ✅ Update Banner
const updateBanner = catchAsync (async (  req, res) => { 
     const { title } = req.body;
    let updateData = { title };

    if (req.file) {
      updateData.image = {
        url: "/uploads/users/" + req.file.filename,
        path: req.file.path,
      };
    }

    const banner = await Banner.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!banner) return res.status(404).json({ error: "Banner not found" });

    res.status(httpStatus.OK).json(
        response({
          message: "Banner Update successfully",
          status: "OK",
          statusCode: httpStatus.OK,
          data: banner,
        })
      );
 
});

// ✅ Delete Banner
const deleteBanner = catchAsync (async (  req, res) => { 
 
    const banner = await Banner.findByIdAndDelete(req.params.id);
    if (!banner) return res.status(404).json({ error: "Banner not found" });

    res.status(httpStatus.OK).json(
        response({
          message: "  Banner delete successfully",
          status: "OK",
          statusCode: httpStatus.OK,
          data: banner,
        })
      );
  
});

module.exports = { addBanner, getBanners, getBannerById, updateBanner, deleteBanner };
