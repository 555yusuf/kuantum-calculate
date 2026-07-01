const { getApiResponsData } = require('../services/apiRespons.service');
const {
  IsValidateWeekend,
  validateBuyInvestment,
} = require('../utils/companyValidate.utils');
const { Investment } = require('../models/Investment.model');
const { User } = require('../models/User.model');
const { MovementsService } = require('../services/Movements.service');
const { Movements } = require('../models/investmentMovements.model');
const getInvestmentService = async (req, investorId) => {
  try {
    const { error } = validateBuyInvestment(req.body);
    if (error) {
      return {
        error: error,
      };
    }

    if (IsValidateWeekend(req.body.date)) {
      return {
        error: 'Hafta sonu borsa kapalıdır.',
      };
    }

    const investor = await User.findById(investorId);
    if (!investor) {
      return {
        error: 'Lütfen giriş yapın.',
      };
    }

    const apiRespons = await getApiResponsData(
      req.body.symbol,
      req.body.date,
      req.body.date
    );

    if (!apiRespons || apiRespons.error) {
      return {
        error: apiRespons?.error || 'API verisi alınamadı.',
      };
    }

    const price = apiRespons[0].adjClose;
    const funds = Number(req.body.amount / price);

    const newInvestment = new Investment({
      user: investor._id,
      amount: req.body.amount,
      funds: funds,
      date: req.body.date,
      symbol: req.body.symbol,
    });
    await newInvestment.save();

    await MovementsService(investor._id, newInvestment._id);

    return { success: true, message: 'Yatırımınız başarıyla yapıldı.' };
  } catch (err) {
    return {
      error: err.message || err,
    };
  }
};

module.exports = { getInvestmentService };
