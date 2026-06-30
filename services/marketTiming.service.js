const { validatePriceRequest } = require('../utils/companyValidate.utils');
const { getApiResponsData } = require('../services/apiRespons.service');

const analyzeMarketTiming = async (obj) => {
  const { error } = await validatePriceRequest(obj);

  if (error) {
    return {
      error: error.details[0].message,
    };
  }

  const apiResponse = await getApiResponsData(obj.symbol, obj.sDate, obj.eDate);
  // console.log(apiResponse);
  
  const data = apiResponse;
  let priceData = [];
  let peakDay = data[0];
  let troughDay = data[0];

  data.forEach((day) => {
    if (day.adjClose > peakDay.close) peakDay = day;
    if (day.adjClose < troughDay.close) troughDay = day;
  });

  return {
    success: true,
    result: {
      enYuksek: {
        fiyat: peakDay.close,
        tarih: peakDay.date.split('T')[0],
      },
      enDusuk: {
        fiyat: troughDay.close,
        tarih: troughDay.date.split('T')[0],
      },
    },
  };
};

module.exports = {
  analyzeMarketTiming,
};
