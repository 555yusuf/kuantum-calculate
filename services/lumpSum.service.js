const {
  validateForDataRequest,
  getCompanySymbol,
  IsValidateWeekend,
  validatePriceRequest,
} = require('../utils/companyValidate.utils');
const { getApiResponsData } = require('./apiRespons.service');
const { get } = require('mongoose');
const lumpsum = async (obj) => {
  const { error } = await validateForDataRequest(obj);

  if (error) {
    return {
      error: true,
      success: false,
      message: error.details[0].message,
    };
  }

  if (IsValidateWeekend(obj.buyDate)) {
    return {
      success: false,
      message: `Girdiginiz tarih ${obj.buyDate} hafta sonuna denk gelmektedir lütfen değiştiriniz `,
    };
  }

  if (IsValidateWeekend(obj.saleDate)) {
    return {
      success: false,
      message: `Girdiginiz tarih ${obj.saleDate} hafta sonuna denk gelmektedir lütfen değiştiriniz `,
    };
  }

  let res1 = await getApiResponsData(obj.symbol, obj.buyDate, obj.buyDate);
  const buyPrice = res1[0].adjClose;
  let res2 = await getApiResponsData(obj.symbol, obj.saleDate, obj.saleDate);
  const saleAmount = res2[0].adjClose;

  let stocks = obj.amount / buyPrice;

  // console.log(`${stocks} alindi `);

  let newAmount = stocks * saleAmount;

  return {
    success: true,
    result: newAmount,
  };
};

module.exports = {
  lumpsum,
};
