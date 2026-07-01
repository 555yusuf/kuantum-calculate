const { registerUser } = require('../controllers/registerUser.controller');
const { Investment } = require('../models/Investment.model');
const { Movements } = require('../models/investmentMovements.model');
const { getCurrentPriceService } = require('../services/currentprice.service');
async function currentprice(symbol) {
  const { weekData } = await getCurrentPriceService(symbol);
  const todayPrice = weekData.at(-1).close;
  //   console.log('today price ', todayPrice);
  return todayPrice;
}
const getInvestment = async (item) => {
  const element = await Investment.findById(item);

  if (!element) {
    return {
      message: 'kullanici icin yatirim bulunmadi ',
    };
  }
  const symbol = element.symbol;
  const newPrice = Number(await currentprice(symbol));
  const price = Number(element.funds * newPrice);
  const netProfit = Number(price - element.amount);
  const roi = Number(((netProfit / element.amount) * 100).toFixed(2));
  // Kodu bozmadan JSON çıktısını güzelleştiriyoruz
  return {
    sembol: symbol,
    foyunGuncelFiyati: newPrice,
    yatirimTarihi: element.date.toISOString().split('T')[0],
    yatirilanTutar: element.amount,
    alinanFonMiktari: Number(element.funds.toFixed(4)),
    guncelDeger: Number(price.toFixed(2)),
    netKarZarar: Number(netProfit.toFixed(2)),
    getiriOrani: `${roi > 0 ? '+' : ''}${roi}%`,
  };
};

const getMovementsService = async (req) => {
  try {
    const user_movements = await Movements.find({ user: req.params.id });
    if (user_movements.length === 0) {
      return {
        message: 'kullanicin daha once islem yapmamistir ',
      };
    }

    let data = [];
    let no = 1;
    for (let item of user_movements) {
      const investmentData = await getInvestment(item.transaction);
      const date = new Date(item.createdAt).toLocaleDateString('sv-SE');
      const tempData = {
        no: no,
        tarih: date,
        islemTuru: item.transaction_type,
        islem: investmentData,
      };

      no++;
      data.push(tempData);
    }
    return {
      result: data,
    };
  } catch (err) {
    return {
      error: err,
    };
  }
};

module.exports = { getMovementsService };
