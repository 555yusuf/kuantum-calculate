const bcrypt = require("bcryptjs");
const { User, validateLogin } = require("../models/User.model");

const loginUserServices = async (obj) => {
  const { error } = validateLogin(obj);
  if (error) {
    return { error: error.details[0].message };
  }
  
  const resultUser = await User.findOne({ email: obj.email });
  if (!resultUser) {
    return {
      error: "Kullanici epostasi yanlistir ",
    };
  }

  const isPasswordMatch = await bcrypt.compare(
    obj.password,
    resultUser.password,
  );
  if (!isPasswordMatch) {
    return {
      error: "Kullanici  sifresi yanlistir ",
    };
  }
  const token = resultUser.generateToken();

  const { password, ...userData } = resultUser.toObject();

  return {
    success: true,
    result: {
      ...userData,
      token,
    },
  };
};

module.exports = {loginUserServices}

