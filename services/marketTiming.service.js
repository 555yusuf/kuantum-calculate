const { validatePriceRequest } = require("../utils/companyValidate.utils");

const axios = require("axios");

const API_KEY = process.env.TIINGO_API_KEY;

const analyzeMarketTiming = async (obj) => {
  const { error } = await validatePriceRequest(obj);

  if (error) {
    return {
      error: error.details[0].message,
    };
  }

  const apiResponse = await axios.get(
    `https://api.tiingo.com/tiingo/daily/${obj.symbol}/prices?startDate=${obj.sDate}&endDate=${obj.eDate}&token=${API_KEY}`,
  );

  const data = apiResponse.data;
  let priceData = [];
  let peakDay = data[0];
  let troughDay = data[0];

  data.forEach((day) => {
    if (day.close > peakDay.close) peakDay = day;
    if (day.close < troughDay.close) troughDay = day;
  });

  return {
    success: true,
    result: {
      enYuksek: {
        fiyat: peakDay.close,
        tarih: peakDay.date.split("T")[0],
      },
      enDusuk: {
        fiyat: troughDay.close,
        tarih: troughDay.date.split("T")[0],
      },
    },
  };
};

module.exports = {
  analyzeMarketTiming,
};
