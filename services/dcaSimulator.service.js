const axios = require("axios");
const { validateFor_dca_ } = require("../utils/companyValidate.utils");

const API_KEY = process.env.TIINGO_API_KEY;

const calculateDCA = async (obj) => {
  const { error } = await validateFor_dca_(obj);

  if (error) {
    return {
      success: false,
      message: error.details[0].message,
    };
  }

  try {
    const { data: price } = await axios.get(
      `https://api.tiingo.com/tiingo/daily/${obj.symbol}/prices?startDate=${obj.sDate}&endDate=${obj.eDate}&token=${API_KEY}`,
    );

    if (!price || price.length === 0) {
      return { success: false, message: "Bu tarih aralığında borsa verisi bulunamadı." };
    }

    let totalInvestedCapital = 0;  
    let totalAccumulatedShares = 0;
    let lastProcessedMonth = "";
    let monthlyDocument = [];

    price.forEach((day) => {
      const fullDate = day.date.split("T")[0];
      const yearAndMonth = fullDate.substring(0, 7);

      if (yearAndMonth !== lastProcessedMonth) {
        const priceOfDay = day.adjClose;
        const sharesBought = obj.amount / priceOfDay;

    
        totalAccumulatedShares += sharesBought;
        totalInvestedCapital += obj.amount;

        monthlyDocument.push({
          tarih: fullDate,
          fiyat: priceOfDay,
          alinanAdet: Number(sharesBought.toFixed(4)),
          toplamHisse: Number(totalAccumulatedShares.toFixed(4)),
          toplamMaliyet: totalInvestedCapital,
        });

        lastProcessedMonth = yearAndMonth;
      }
    });


    const lastDayPrice = price[price.length - 1].close;
    const currentPortfolioValue = totalAccumulatedShares * lastDayPrice;
    const netProfitLoss = currentPortfolioValue - totalInvestedCapital;
    const roiRatio = (netProfitLoss / totalInvestedCapital) * 100;

    return {
      success: true,
      result: {
        ozet: {
          toplamYatirilanTutar: totalInvestedCapital,
          guncelPortfoyDegeri: Number(currentPortfolioValue.toFixed(2)),
          netKarZarar: Number(netProfitLoss.toFixed(2)),
          getiriOrani: `%${roiRatio.toFixed(2)}`,
          toplamHisseAdedi: Number(totalAccumulatedShares.toFixed(4)),
          sonHisseFiyati: lastDayPrice,
        },
        islemSayisi: monthlyDocument.length,
        aylikDetaylar: monthlyDocument,
      },
    };

  } catch (error) {
    return {
      success: false,
      message: "Tiingo API'den veri çekilirken bir hata oluştu.",
    };
  }
};

module.exports = { calculateDCA };