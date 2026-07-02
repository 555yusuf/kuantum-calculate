const { User, validateUpdate } = require("../models/User.model");

const getUpdatePassword = async (id, obj) => {
  const { error } = validateUpdate(obj);
  if (error) {
    return { error: error.details[0].message };
  }
  const updatedUser = await User.findByIdAndUpdate(
    id,
    {
      $set: {
        email : obj.email,
        username: obj.username,
        age: obj.age,
      },
    },
    { returnDocument: "after" },
  ).select("-password");
  return {
    result: updatedUser,
  };
};
module.exports = { getUpdatePassword };
