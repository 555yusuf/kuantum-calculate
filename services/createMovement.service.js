const { Movements } = require('../models/investmentMovements.model');
const MovementsService = async (userId, investmentId) => {
  try {
    const movement = new Movements({
      user: userId,
      transaction: investmentId,
      transaction_type: 'Buy',
    });

    await movement.save();
  } catch (err) {
    return {
      error: err.message || err,
    };
  }
};

module.exports = { MovementsService };
