const asyncHandler = require("express-async-handler");
const { getDailyTimeSeries } = require("../services/timeMachine.service");
const { LumpSum } = require("../services/LumpSum.service");
const { analyzeMarketTiming } = require("../services/marketTiming.service");
const { calculateDCA } = require("../services/dcaSimulator.service");
/**
 *   @desc       Get company price
 *   @route      /api/company/prices
 *   @method     POST
 *   @access     public
 */

const fetchHistoricalPrices = asyncHandler(async (req, res) => {
  const serviceRes = await getDailyTimeSeries(req.body);

  if (serviceRes.error) {
    return res.status(400).json(serviceRes.error);
  }

  const { success, result } = serviceRes;

  res.status(200).json(result);
});

/**
 *   @desc       Get company price
 *   @route      /api/company/amount
 *   @method     POST
 *   @access     public
 */

const getNewAmount = asyncHandler(async (req, res) => {
  const serviceRes = await LumpSum(req.body);

  if (serviceRes.error) {
    return res.status(400).json({ message: serviceRes.message });
  }

  if (!serviceRes.success) {
    return res.status(400).json({ message: serviceRes.message });
  }

  const capital = Number(req.body.amount);
  const currentValue = serviceRes.result;
  const netProfit = Number((currentValue - capital).toFixed(2));
  const roi = Number(((netProfit / capital) * 100).toFixed(2));

  res.status(200).json({
    success: true,
    data: {
      yatirilanTutar: capital,
      guncelDeger: currentValue,
      netKarZarar: netProfit,
      getiriOrani: `${roi}%`,
    },
  });
});

/**
 *   @desc       Get company price
 *   @route      /api/company/timing
 *   @method     POST
 *   @access     public
 */
const getAnalyzeMarketTiming = asyncHandler(async (req, res) => {
  const serviceRes = await analyzeMarketTiming(req.body);

  if (serviceRes.error) {
    return res.status(400).json(serviceRes.error);
  }

  const { success, result } = serviceRes;

  res.status(200).json(result);
});

/**
 *   @desc       Dollar Cost Averaging (DCA) Yatırım Simülasyonu
 *   @route      /api/company/dca
 *   @method     POST
 *   @access     public
 */

const getDcaSimulation = asyncHandler(async (req, res) => {
  const serviceRes =await calculateDCA(req.body);
  if (serviceRes.error) {
    return res.status(400).json(serviceRes.error);
  }
  const { success, result } = serviceRes;

  res.status(200).json(result);
});

module.exports = {
  fetchHistoricalPrices,
  getNewAmount,
  getAnalyzeMarketTiming,
  getDcaSimulation,
};
