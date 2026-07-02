const {getApiResponsData} = require('./apiRespons.service')
const getCurrentPriceService = async (symbol) => {
  try {
    let today = new Date();
    let last_week = new Date();
    last_week.setDate(today.getDate() - 7);
    today = today.toISOString().split('T')[0];
    last_week = last_week.toISOString().split('T')[0];
    const apiResponse = await getApiResponsData(symbol,last_week,today) 
    
    let data = [];
    apiResponse.forEach((element) => {
      let date = new Date(element.date).toISOString().split('T')[0];
      const letData = {
        date: date,
        close: element.adjClose,
      };
      data.push(letData);
    });
    data.at(-1).date = `Guncel fiyat ==> ${data.at(-1).date}`;
    return {
      weekData: data,
      
    };
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.detail || error.message,
    };
  }
};

// test fnc 
// const test = async (sembol) => {
//   const { weekData, today, error, message } = await getCurrentPrice(sembol);
  
//   if (error) {
//     console.log("Bir hata oluştu:", message);
//     return;
//   }

//   console.log("Haftalık Veriler:", weekData);
//   console.log("Bugünün Verisi:", today);
// }
// test('AAPl')

module.exports = { getCurrentPriceService };
