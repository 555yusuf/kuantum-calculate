const express = require('express');
const router = express.Router();
const {
  fetchHistoricalPrices,
  myinvestment,
  getNewAmount,
  getAnalyzeMarketTiming,
  getDcaSimulation,
  getCurrentPrice,
  getInvestment,
} = require('../controllers/asset.controller');
const { getMovements } = require('../controllers/movements.controller');
router.post('/prices', fetchHistoricalPrices);
router.post('/amount', getNewAmount);
router.post('/timing', getAnalyzeMarketTiming);
router.post('/dca', getDcaSimulation);
router.post('/current-price', getCurrentPrice);
router.post('/investments/:id', getInvestment);
router.get('/myinvestment/:id', myinvestment);
router.get('/Movements/:id', getMovements);

module.exports = router;
