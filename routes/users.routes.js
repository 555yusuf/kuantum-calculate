const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/registerUser.controller");
const { loginUser } = require("../controllers/loginUser.controller");
const { updateUser } = require("../controllers/updateUserData.controller");
const { getAllUser } = require("../controllers/User.controller");
const { getDeleteUser } = require("../controllers/userDelete.controller");
const { verifyTokenAndAuthorization } = require("../middlewares/verifyToken");
const {
  getForgetPassword,renderPasswordResetpage,resetPassword
} = require("../controllers/ressetPassword.controller");
router.get("/", getAllUser);

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.post("/user-update/:id", verifyTokenAndAuthorization, updateUser);
router.post("/user-delete/:id", verifyTokenAndAuthorization, getDeleteUser);
router.post("/password-reset", getForgetPassword);
router.get('/password/reset-password/:id/:token',renderPasswordResetpage);
router.post('/reset-password/:id/:token', resetPassword);

module.exports = router;
