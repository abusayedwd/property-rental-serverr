const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const response = require("../config/response");
const { userService } = require("../services");
const unlinkImages = require("../common/unlinkImage");
const { User } = require("../models");

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res
    .status(httpStatus.CREATED)
    .json(
      response({
        message: "User Created",
        status: "OK",
        statusCode: httpStatus.CREATED,
        data: user,
      })
    );
});


 
const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["fullName", "role", "email"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  
  // Add default sorting if not provided
  if (!options.sortBy) {
    options.sortBy = '-createdAt'; // Sort by createdAt descending (latest first)
  }

  const result = await userService.queryUsers(filter, options);
  res
    .status(httpStatus.OK)
    .json(
      response({
        message: "All Users",
        status: "OK",
        statusCode: httpStatus.OK,
        data: result,
      })
    );
});

 

const toggleBlockStatus = catchAsync(async (req, res) => {
  const { userId } = req.params;  // Get userId from URL parameters

  if (!userId) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User ID is required");
  }

  // Call the service to toggle the block status
  const updatedUser = await userService.toggleUserBlockStatus(userId);

  res.status(httpStatus.OK).json({
    message: `User is successfully ${updatedUser.isBlocked ? 'blocked' : 'unblocked'}`,
    data: updatedUser,
  });
});





const logedUser = catchAsync(async (req, res) => {
  const userId = req.user.id
  let user = await userService.logedUser(userId);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  res
    .status(httpStatus.OK)
    .json(
      response({
        message: "User",
        status: "OK",
        statusCode: httpStatus.OK,
        data: { user},
      })
    );
});

const getUser = catchAsync(async (req, res) => {
  
  let user = await userService.getUserById(req.params.userId);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  res
    .status(httpStatus.OK)
    .json(
      response({
        message: "User",
        status: "OK",
        statusCode: httpStatus.OK,
        data: { user},
      })
    );
});

const updateUser = catchAsync(async (req, res) => {

  const image = {};
  if (req.file) {
    image.url = "/uploads/users/" + req.file.filename;
    image.path = req.file.path;
  }
  if (req.file) {
    req.body.image = image;
  }

  const user = await userService.updateUserById(req.params.userId, req.body);

  res
    .status(httpStatus.OK)
    .json(
      response({
        message: "User Updated",
        status: "OK",
        statusCode: httpStatus.OK,
        data: user,
      })
    );
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res
    .status(httpStatus.OK)
    .json(
      response({
        message: "User Deleted",
        status: "OK",
        statusCode: httpStatus.OK,
        data: {},
      })
    );
});


module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  logedUser,
  toggleBlockStatus,
 
};
