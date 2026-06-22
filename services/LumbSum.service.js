const {
  validateForDataRequest,
  getCompanySymbol,
  IsValidateWeekend,
  validatePriceRequest,
} = require("../utils/companyValidate.utils");
const axios = require("axios");

const API_KEY = process.env.TIINGO_API_KEY;

const LumbSum = async (obj) => {
  const { error } = await validateForDataRequest(obj);

  if (error) {
    return {
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
  //   console.log(`start  date : ${obj.buyDate} || End date ${obj.saleDate} || symbol ${obj.symbol}`,);

  async function apiResponse(date) {
    return await axios.get(
      `https://api.tiingo.com/tiingo/daily/${obj.symbol}/prices?startDate=${date}&endDate=${date}&token=${API_KEY}`,
    );
  }

  let res1 =  await apiResponse(obj.buyDate);
  const buyPrice =res1.data[0].close;
  let res2 = await apiResponse(obj.saleDate);
  const saleAmount = res2.data[0].close;

  let stocks = obj.amount / buyPrice;

  console.log(`${stocks} alindi `);

  let newAmount = stocks * saleAmount;

  return {
    success : true,
    result : newAmount,
  };
};

module.exports = {
  LumbSum,
};
