const { User } = require('../models/User.model');
const { Investment } = require('../models/Investment.model');
const { getCurrentPriceService } = require('./GetCurrentPrice.service');
const { Collection } = require('mongoose');
async function currentprice(symbol) {
  const { weekData } = await getCurrentPriceService(symbol);
  const todayPrice = weekData.at(-1).close;
  //   console.log('today price ', todayPrice);
  return todayPrice;
}
const getAllInvest = async (investorId) => {
  const investor = await User.findById(investorId);
  if (!investor) {
    return {
      error: 'Kullanici bulunmadi ',
    };
  }
  let allinvest = 0;

  const investmentData = await Investment.find({ user: investor });
  if (investmentData.length === 0) {
    return {
      message: 'kullanici icin yatirim bulunmadi ',
    };
  }

  let data = [];

  for (const element of investmentData) {
    const symbol = element.symbol;
    const newPrice = Number(await currentprice(symbol));
    const price = Number(element.funds * newPrice);
    const netProfit = Number(price - element.amount);
    const roi = Number(((netProfit / element.amount) * 100).toFixed(2));
    allinvest += price;
    // Kodu bozmadan JSON çıktısını güzelleştiriyoruz
    let tempData = {
      sembol: symbol,
      foyunGuncelFiyati : newPrice,
      yatirimTarihi: element.date.toISOString().split('T')[0], 
      yatirilanTutar: element.amount,
      alinanFonMiktari: Number(element.funds.toFixed(4)), 
      guncelDeger: Number(price.toFixed(2)), 
      netKarZarar: Number(netProfit.toFixed(2)),
      getiriOrani: `${roi > 0 ? '+' : ''}${roi}%`, 
    };
    data.push(tempData);
  }
  data.push(`Tum varliklariniz ${allinvest.toFixed(2)}`);
  //   console.log(data)
  return { success: true, alldata: data };
};

module.exports = { getAllInvest };
