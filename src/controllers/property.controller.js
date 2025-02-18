
const httpStatus = require("http-status");
const { Property } = require("../models");
const { propertyService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const response = require("../config/response");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
 
// Create Property
// const createProperty = catchAsync(async (req, res) => {
//   const userId = req.user.id
//   console.log(userId)
//   const { houseName, place,date,textArea, propertyType, type, rooms, baths, price, state, subState, isPromotion } = req.body;

//   const image = {};
//   if (req.file) {
//     image.url = "/uploads/property/" + req.file.filename;
//     image.path = req.file.path;
//   }
//   if (req.file) {
//     req.body.image = image;
//   }

// //  console.log("233333333333", req.file)

//   const propertyData = new Property({
//     landlordId:userId,
//     date,
//     textArea,
//     houseName,
//     place,
//     propertyType,
//     type,
//     rooms,
//     baths,
//     price,
//     state,
//     subState,
//     isPromotion,
//     image,
//   });

//   const property = await propertyService.createProperty(propertyData);
//   res
//     .status(httpStatus.CREATED)
//     .json(
//       response({
//         message: "Property Created",
//         status: "OK",
//         statusCode: httpStatus.CREATED,
//         data: property,
//       })
//     );
// });

const createProperty = catchAsync(async (req, res) => {
  const userId = req.user.id;
  console.log(userId);
  const { houseName, place, date, textArea, propertyType, type, rooms, baths, price, state, subState, isPromotion } = req.body;

  const images = [];
  if (req.files && req.files.length >= 1 && req.files.length <= 5) {
    req.files.forEach(file => {
      images.push({
        url: "/uploads/property/" + file.filename,
        path: file.path,
      });
    });
  } else {
    return res.status(400).json({
      message: "You must upload between 1 and 5 images.",
    });
  }

  const propertyData = new Property({
    landlordId: userId,
    date,
    textArea,
    houseName,
    place,
    propertyType,
    type,
    rooms,
    baths,
    price,
    state,
    subState,
    isPromotion,
    images,
  });

  const property = await propertyService.createProperty(propertyData);
  res
    .status(httpStatus.CREATED)
    .json(
      response({
        message: "Property Created",
        status: "OK",
        statusCode: httpStatus.CREATED,
        data: property,
      })
    );
});





// Get All Properties
const getAllProperties = catchAsync(async (req, res) => {
  const filter = pick(req.query, [
    "houseName",
    "address",
    "propertyType",
    "type",
    "rooms",
    "baths",
    "price",
    "state",
    "subState",
    "email",
  ]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);

  const properties = await propertyService.getAllProperties(filter, options);

  res.status(httpStatus.OK).json(
    response({
      message: "Properties retrieved successfully",
      status: "OK",
      statusCode: httpStatus.OK,
      data: properties,
    })
  );
});


const getPromotedARentProperties = catchAsync(async (req, res) => {
  const filter = pick(req.query, [
      "houseName",
      "address",
      "propertyType",
      "type",
      "rooms",
      "baths",
      "price",
      "state",
      "subState",
      "email",
  ]);

  const options = pick(req.query, ["sortBy", "limit", "page"]);

  // Add isPromotion: true to the query filter
  filter.isPromotion = true;
  filter.propertyType = "rent" ;

  const properties = await propertyService.getPromotedARentProperties(filter, options);

  res.status(httpStatus.OK).json(
      response({
          message: "Promoted properties retrieved successfully",
          status: "OK",
          statusCode: httpStatus.OK,
          data: properties,
      })
  );
});

const getPromotedASellProperties = catchAsync(async (req, res) => {
  const filter = pick(req.query, [
      "houseName",
      "address",
      "propertyType",
      "type",
      "rooms",
      "baths",
      "price",
      "state",
      "subState",
      "email",
  ]);

  const options = pick(req.query, ["sortBy", "limit", "page"]);

  // Add isPromotion: true to the query filter
  filter.isPromotion = true;
  filter.propertyType = "sell" ;

  const properties = await propertyService.getPromotedASellProperties(filter, options);

  res.status(httpStatus.OK).json(
      response({
          message: "Promoted properties retrieved successfully",
          status: "OK",
          statusCode: httpStatus.OK,
          data: properties,
      })
  );
});


const getMyProperty = catchAsync(async (req, res) => {
  const userId = req.user.id; // Assuming the user is authenticated
  // console.log(userId)
  const filter = pick(req.query, [
    "houseName",
    "address",
    "propertyType",
    "type",
    "rooms",
    "baths",
    "price",
    "state",
    "subState",
    "email",
]);

const options = pick(req.query, ["sortBy", "limit", "page"]);

  const properties = await propertyService.getMyProperty(userId,filter, options);

  res.status(httpStatus.OK).json(
    response({
      message: "User properties retrieved successfully",
      status: "OK",
      statusCode: httpStatus.OK,
      data: properties,
    })
  );
});



// Get Property by ID
const getPropertyById =  catchAsync(async( req, res) => {
  const id = req.params.id
 
    const property = await propertyService.getPropertyById(id);
    if (!property){
      throw new ApiError({ message: "Property not found" })
    } 
    res.status(httpStatus.OK).json(
      response({
        message: "SingleProperties retrieved successfully",
        status: "OK",
        statusCode: httpStatus.OK,
        data: property,
      })
    );
  
});

// Update Property
const updateProperty =  catchAsync (async(  req, res) => {
 
  const image = {};
  if (req.file) {
    image.url = "/uploads/property/" + req.file.filename;
    image.path = req.file.path;
  }
  if (req.file) {
    req.body.image = image;
  }

    const property = await propertyService.updateProperty(req.params.id, req.body);
    if (!property){
      throw new ApiError({ message: "Property not found" })
    } 

    res.status(httpStatus.OK).json(
      response({
        message: "Updated successfully",
        status: "OK",
        statusCode: httpStatus.OK,
        data: property,
      })
    );
 
});

// Delete Property
const deleteProperty =  catchAsync(async(req, res) => {
 
    const property = await propertyService.deleteProperty(req.params.id);
    if (!property){
      throw new ApiError({message:"Property not found"})
    }  
    res.status(200).json({ message: "Property deleted successfully"});
   
});

module.exports = {
     createProperty,
     getAllProperties,
     getPropertyById,
     getMyProperty,
     getPromotedASellProperties,
     getPromotedARentProperties,
     updateProperty,
     deleteProperty 
    };
