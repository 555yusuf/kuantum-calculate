const asyncHandler = require("express-async-handler");
const { registerUserService } = require("../services/registerUser.service");
/*
 * @desc    Create new user
 * @route   /api/users/register
 * @method  POST
 * @access  Public
 */

const registerUser = asyncHandler(async (req, res) => {
  const serviceResult = await registerUserService(req.body);

  if (serviceResult.error) {
    return res.status(400).json(serviceResult.error);
  }
  const {success,result} = serviceResult;
  
  res.status(201).json({
    message: "İşlem başarılı",
    success: success,
    data: result, // result içerisinde şifresiz kullanıcı bilgileri ve token yer alıyor
  });



});

module.exports = { registerUser };
