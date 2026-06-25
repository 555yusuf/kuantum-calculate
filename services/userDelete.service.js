const { User, validateLogin } = require("../models/User.model");

const DeleteUser = async (id, obj) => {
  const { error } = validateLogin(obj);
  if (error) {
    return { error: error.details[0].message };
  }
  const user = await User.findById(id);
  if(!user){
    return {
        error : "kullanici bulunmadi "
    };
  }

  const deletedUser = await User.findByIdAndDelete(id).select("-password");

  return {
    result: `Kullanici silindi`,
  };
};
module.exports = { DeleteUser };
