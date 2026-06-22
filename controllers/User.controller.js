const asyncHandler = require("express-async-handler");
const { User } = require("../models/User.model");

/*
 * @desc    Get all users 
 * @route   /api/users/
 * @method  GET
 * @access  Public
 */

const getAllUser = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(202).json(users);
});

module.exports = { getAllUser };
