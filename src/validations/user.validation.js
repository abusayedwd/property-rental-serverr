const Joi = require("joi");
const { password, objectId } = require("./custom.validation");

const createUser = {
  body: Joi.object().keys({
       email: Joi.string().required().email(),
       password: Joi.string().required().custom(password),
       fullName: Joi.string(),
       street: Joi.string() ,
       streetName: Joi.string(),
       company: Joi.string(),
       city: Joi.string(), 
       role: Joi.string().required().valid("user", "landlord", "admin"),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  
  // params: Joi.object().keys({
  //   userId: Joi.required().custom(objectId),
  // }),
  // file: Joi.object().keys({
  //   filename: Joi.string().required(),
  // }),
  // body: Joi.object()
  //   .keys({
  //     email: Joi.string().email(),
  //     password: Joi.string().custom(password),
  //     name: Joi.string(),
  //     phoneNumber: Joi.string(),
  //   })
    // .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};


const getHome = {
 
};

module.exports = {
  getHome,
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
