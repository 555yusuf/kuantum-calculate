const {
  validatePriceRequest,
  getCompanySymbol,
} = require("../utils/companyValidate.utils");
const axios = require("axios");

const API_KEY = process.env.TIINGO_API_KEY;

const getDailyTimeSeries = async (obj) => {
  const { error } = await validatePriceRequest(obj);
    
  if (error) {    
    return {
      error: error.details[0].message,
    };
  }

  // console.log(`start  date : ${obj.sDate} || End date ${obj.eDate} || symbol ${obj.symbol}`);
  
  const apiResponse = await axios.get(
    `https://api.tiingo.com/tiingo/daily/${obj.symbol}/prices?startDate=${obj.sDate}&endDate=${obj.eDate}&token=${API_KEY}`,
  );

  const data = apiResponse.data;

  let priceData = [];

  data.forEach((day) => {
    const dateOnly = day.date.split("T")[0];

    const closePrice = day.adjClose;

    priceData.push({
      tarih: dateOnly,
      kapanisFiyati: closePrice,
    });
  });

  return {
    success: true,
    result: priceData,
  };
};

module.exports = {
  getDailyTimeSeries,
};
