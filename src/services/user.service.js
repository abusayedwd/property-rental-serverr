// const httpStatus = require("http-status");
// const { User } = require("../models");
// const ApiError = require("../utils/ApiError");
// const { sendEmailVerification } = require("./email.service");
// const unlinkImages = require("../common/unlinkImage");

// const createUser = async (userBody) => {
//   if (await User.isEmailTaken(userBody.email)) {
//     throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
//   }
//   const oneTimeCode = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
   
//   console.log("codddddddddddd: ",oneTimeCode, userBody)

//   if (userBody.role === "user" || userBody.role === "landlord") {

//     sendEmailVerification(userBody, oneTimeCode);
//   } 
//   return User.create({ ...userBody, oneTimeCode });
// };


 

// const queryUsers = async (filter, options) => { 
//   const query = {};

//   // Loop through each filter field and add conditions if they exist
//   for (const key of Object.keys(filter)) {
//     if (
//       (key === "fullName" || key === "email" || key === "username") &&
//       filter[key] !== ""
//     ) {
//       query[key] = { $regex: filter[key], $options: "i" }; // Case-insensitive regex search for name
//     } else if (filter[key] !== "") {
//       query[key] = filter[key];
//     }
//   }

//   // Default sorting by createdAt descending if not provided
//   const sort = options.sortBy || '-createdAt'; 

//   // Handle pagination and sorting
//   const users = await User.paginate(query, {
//     ...options,
//     sort: sort,
//   });

//   return users;
// };

 

// const toggleUserBlockStatus = async (id) => {
//   // Find the user by ID
//   const user = await  User.findById(id);

//   if (!user) {
//     throw new ApiError(httpStatus.NOT_FOUND, "User not found");
//   }

//   // Toggle the isBlocked status
//   user.isBlocked = !user.isBlocked;

//   // Save the updated user
//   await user.save();

//   return user;
// };





// const logedUser = async (id) => {
//   return User.findById(id);
// };

// const getUserById = async (id) => {
//   return User.findById(id);
// };

// const getUserByEmail = async (email) => {
//   return User.findOne({ email }); 
   
// };

// const updateUserById = async (userId, updateBody, files) => {
//   const user = await getUserById(userId);

//   if (!user) {
//     throw new ApiError(httpStatus.NOT_FOUND, "User not found");
//   }

//   if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
//     throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
//   }

//   if (files && files.length > 0) {
//     updateBody.photo = files;
//   } else {
//     delete updateBody.photo; // remove the photo property from the updateBody if no new photo is provided
//   }

//   Object.assign(user, updateBody);
//   await user.save();
//   return user;
// };

// const deleteUserById = async (userId) => {
//   const user = await getUserById(userId);
//   if (!user) {
//     throw new ApiError(httpStatus.NOT_FOUND, "User not found");
//   }
//   await user.remove();
//   return user;
// };

// const isUpdateUser = async (userId, updateBody) => {
//   const user = await getUserById(userId);
//   if (!user) {
//     throw new ApiError(httpStatus.NOT_FOUND, "User not found");
//   }

//   const oneTimeCode =
//     Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
//  console.log(oneTimeCode)

//   if (updateBody.role === "user" || updateBody.role === "landlord", updateBody.role === "admin") {
//     sendEmailVerification(updateBody.email, oneTimeCode);
//   }

//   Object.assign(user, updateBody, {
//     isDeleted: false,
//     isSuspended: false,
//     isEmailVerified: false,
//     isResetPassword: false,
//     isPhoneNumberVerified: false,
//     oneTimeCode: oneTimeCode,
//   });
//   await user.save();
//   return user;
// };

// module.exports = {
//   createUser,
//   queryUsers,
//   getUserById,
//   getUserByEmail,
//   updateUserById,
//   deleteUserById,
//   isUpdateUser,
//   logedUser,
//   toggleUserBlockStatus
// };


const httpStatus = require("http-status");
const { User } = require("../models");
const ApiError = require("../utils/ApiError");
const { sendEmailVerification } = require("./email.service");
const unlinkImages = require("../common/unlinkImage");

const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  const oneTimeCode = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
  

  if (userBody.role === "user" || userBody.role === "landlord") {

    sendEmailVerification(userBody.email, userBody.fullName, oneTimeCode);
  }
  return User.create({ ...userBody, oneTimeCode });
};



const queryUsers = async (filter, options) => {
  const query = {};

  // Loop through each filter field and add conditions if they exist
  for (const key of Object.keys(filter)) {
    if (
      (key === "fullName" || key === "email" || key === "username") &&
      filter[key] !== ""
    ) {
      query[key] = { $regex: filter[key], $options: "i" }; // Case-insensitive regex search for name
    } else if (filter[key] !== "") {
      query[key] = filter[key];
    }
  }

  const users = await User.paginate(query, options);

  // Convert height and age to feet/inches here...

  return users;
};



const getUserById = async (id) => {
  return User.findById(id);
};

const logedUser = async (id) => {
  return User.findById(id);
};

const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

const updateUserById = async (userId, updateBody, files) => {
  const user = await getUserById(userId);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }

  if (files && files.length > 0) {
    updateBody.photo = files;
  } else {
    delete updateBody.photo; // remove the photo property from the updateBody if no new photo is provided
  }

  Object.assign(user, updateBody);
  await user.save();
  return user;
};

const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  await user.remove();
  return user;
};

const isUpdateUser = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  const oneTimeCode =
    Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;


  if (updateBody.role === "user" || updateBody.role === "landlord") {
    sendEmailVerification(updateBody.email,updateBody.fullName, oneTimeCode);
  }

  Object.assign(user, updateBody, { 
    isDeleted: false,
    isSuspended: false,
    isEmailVerified: false,
    isResetPassword: false,
    isPhoneNumberVerified: false,
    oneTimeCode: oneTimeCode,
  });
  await user.save();
  return user;
};

const toggleUserBlockStatus = async (id) => {
  // Find the user by ID
  const user = await  User.findById(id);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  // Toggle the isBlocked status
  user.isBlocked = !user.isBlocked;

  // Save the updated user
  await user.save();

  return user;
};

module.exports = { 
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  isUpdateUser,
  logedUser,
  toggleUserBlockStatus
};