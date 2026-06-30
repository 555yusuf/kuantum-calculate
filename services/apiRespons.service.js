const axios = require('axios');

const API_KEY = process.env.TIINGO_API_KEY;
const getApiResponsData = async (symbol, startDate, endDate) => {
  try {
    const apiResponse = await axios.get(
      `https://api.tiingo.com/tiingo/daily/${symbol}/prices?startDate=${startDate}&endDate=${endDate}&token=${API_KEY}`
    );
    // console.log('api servsi ',apiResponse.data)
    return apiResponse.data;
  } catch(err) {
    return {
      error : err
    };
  }
};
module.exports = { getApiResponsData };
