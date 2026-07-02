const { User, validateLogin } = require('../models/User.model');
const { Investment } = require('../models/Investment.model');
const { log } = require('console');
const DeleteUser = async (id, obj) => {
  const { error } = validateLogin(obj);
  if (error) {
    return { error: error.details[0].message };
  }
  const user = await User.findById(id);
  if (!user) {
    return {
      error: 'kullanici bulunmadi ',
    };
  }

  const userInvestment = await Investment.find({ user: id });
  console.log(userInvestment);
  const data = userInvestment;
  for (const element of userInvestment) {
    await Investment.findByIdAndDelete(element._id);
  }

  const deletedUser = await User.findByIdAndDelete(id).select('-password');

  return {
    result: `Kullanici silindi ${deletedUser}`,
  };
};
module.exports = { DeleteUser };
