const express = require("express");
const router = express.Router();
const {
  fetchHistoricalPrices,
  getNewAmount,getAnalyzeMarketTiming,getDcaSimulation
} = require("../controllers/asset.controller");

router.post("/prices", fetchHistoricalPrices);
router.post("/amount", getNewAmount);
router.post("/timing", getAnalyzeMarketTiming);
router.post("/dca", getDcaSimulation);

module.exports = router;
