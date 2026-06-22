const asyncHandler = require("express-async-handler");
const { loginUserServices } = require("../services/loginUser.service");
/**
 * @desc    Create new user
 * @route   /api/users/register
 * @method  POST
 * @access  Public
 */
const loginUser = asyncHandler(async (req, res) => {
  const servirceResult = await loginUserServices(req.body);

  if (servirceResult.error) {
    return res.status(400).json(servirceResult.error);
  }
  const { success, result } = servirceResult;

  res.status(200).json({
    message: "İşlem başarılı",
    success: success,
    data: result, // result içerisinde şifresiz kullanıcı bilgileri ve token yer alıyor
  });
});



module.exports = {
    loginUser
}