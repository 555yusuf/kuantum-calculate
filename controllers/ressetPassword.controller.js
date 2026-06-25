const asyncHandler = require("express-async-handler");
const {
  sendForgetPasswordLink,
  updateNewPassword,
} = require("../services/resetPassword.service");

const getForgetPassword = asyncHandler(async (req, res) => {
  const serviceResult = await sendForgetPasswordLink(req.body);
  if (serviceResult.error) {
    console.log(serviceResult.error);
    return res.status(400).json({ message: serviceResult.error });
  }
  res.status(200).json("ISLEM BASARILI ");
});

const renderPasswordResetpage = asyncHandler(async (req, res) => {
  const { id, token } = req.params;

  res.render("resetPassword", { id: id, token: token });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { id, token } = req.params;

  const { password } = req.body;

  const serviceResult = await updateNewPassword(id, token, password);

  if (serviceResult.error) {
    return res.status(400).json({ message: serviceResult.error });
  }

  res.status(200).json({ message: serviceResult.result });
});

module.exports = {
  getForgetPassword,
  renderPasswordResetpage,
  resetPassword,
};
