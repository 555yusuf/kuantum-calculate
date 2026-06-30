const bcrypt = require("bcryptjs");
const { User, validateRegister } = require("../models/User.model");

const registerUserService = async (obj) => {
  const { error } = validateRegister(obj);
  if (error) {
    return { error: error.details[0].message };
  }
  const resultUser = await User.findOne({ email: obj.email });
  if (resultUser) {
    return { error: "kullanici daha once kayit yapmistir" };
  }

  const usernameExists = await User.findOne({ username: obj.username });
  if (usernameExists) {
    return {
      error: "lutfen giris yapin ",
    };
  }

  const salt = await bcrypt.genSalt(10);
  obj.password = await bcrypt.hash(obj.password, salt);

  const user = await new User({
    email: obj.email,
    username: obj.username,
    password: obj.password,
    age: obj.age,
  });

  await user.save(); // user zaten güncelleniyor, ekstra değişkene gerek yok
  const token = user.generateToken();

  // Mongoose objesini güvenli bir şekilde saf JS objesine çeviriyoruz
  const { password, ...userData } = user.toObject();

  return {
    success: true,
    result: {
      ...userData,
      token,
    },
  };
};

module.exports = {
  registerUserService,
};
