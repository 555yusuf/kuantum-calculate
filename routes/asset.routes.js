const express = require("express");
const router = express.Router();
const {
  fetchHistoricalPrices,myinvestment,
  getNewAmount,getAnalyzeMarketTiming,getDcaSimulation,getCurrentPrice,getInvestment
} = require("../controllers/asset.controller");

router.post("/prices", fetchHistoricalPrices);
router.post("/amount", getNewAmount);
router.post("/timing", getAnalyzeMarketTiming);
router.post("/dca", getDcaSimulation);
router.post('/current-price',getCurrentPrice)
router.post('/investments/:id',getInvestment)
router.get('/myinvestment/:id',myinvestment)

module.exports = router;
