const httpStatus = require("http-status");
const {Property} = require("../models");
const ApiError = require("../utils/ApiError");

// Create Property
const createProperty = async (data) => {
  console.log(data.houseName)
  const existingHouse = await Property.findOne({houseName: data.houseName})
  if(existingHouse){
    throw new ApiError(httpStatus.BAD_REQUEST, "houseName alredy exist");
  }
  return await Property.create(data);
};
 
const getAllProperties = async (filter, options) => {
  const query = {};

  for (const key of Object.keys(filter)) {
    if (
      [
        "houseName",
        "address",
        "propertyType",
        "type",
        "state",
        "subState",
        "email",
      ].includes(key) &&
      filter[key] !== ""
    ) {
      query[key] = { $regex: filter[key], $options: "i" }; // Case-insensitive search
    } else if (["rooms", "baths", "price"].includes(key) && filter[key] !== "") {
      query[key] = Number(filter[key]); // Convert numeric values properly
    }
  }

  const properties = await Property.paginate(query, options);
  return properties;
};


const getPromotedARentProperties = async (filter, options) => {
  const query = { isPromotion: true }; // Ensure only promoted properties are fetched

  for (const key of Object.keys(filter)) {
      if (
          [
              "houseName",
              "address",
              "propertyType",
              "type",
              "state",
              "subState",
              "email",
          ].includes(key) &&
          filter[key] !== ""
      ) {
          query[key] = { $regex: filter[key], $options: "i" }; // Case-insensitive search
      } else if (["rooms", "baths", "price"].includes(key) && filter[key] !== "") {
          query[key] = Number(filter[key]); // Convert numeric values properly
      }
  }

  const properties = await Property.paginate(query, options);
  return properties;
};
const getPromotedASellProperties = async (filter, options) => {
  const query = { isPromotion: true }; // Ensure only promoted properties are fetched

  for (const key of Object.keys(filter)) {
      if (
          [
              "houseName",
              "address",
              "propertyType",
              "type",
              "state",
              "subState",
              "email",
          ].includes(key) &&
          filter[key] !== ""
      ) {
          query[key] = { $regex: filter[key], $options: "i" }; // Case-insensitive search
      } else if (["rooms", "baths", "price"].includes(key) && filter[key] !== "") {
          query[key] = Number(filter[key]); // Convert numeric values properly
      }
  }

  const properties = await Property.paginate(query, options);
  return properties;
};



const getMyProperty = async (landlordId,filter, options) => {
  const query = { landlordId }; // Assuming properties have an 'owner' field storing the user ID

  for (const key of Object.keys(filter)) {
    if (
        [
            "houseName",
            "address",
            "propertyType",
            "type",
            "state",
            "subState",
            "email",
        ].includes(key) &&
        filter[key] !== ""
    ) {
        query[key] = { $regex: filter[key], $options: "i" }; // Case-insensitive search
    } else if (["rooms", "baths", "price"].includes(key) && filter[key] !== "") {
        query[key] = Number(filter[key]); // Convert numeric values properly
    }
}


  const properties = await Property.paginate(query, options);
  return properties;
};



// Get Property by ID

const getPropertyById = async (id) => {
  return await Property.findById(id).populate("landlordId");
};

// Update Property
const updateProperty = async (id, data) => {
  console.log("tess resss:87",data)
  return await Property.findByIdAndUpdate(id, data, { new: true });
};

// Delete Property
const deleteProperty = async (id) => {
  return await Property.findByIdAndDelete(id);
};

module.exports = {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  getMyProperty,
  getPromotedASellProperties,
  deleteProperty,
  getPromotedARentProperties,
};
