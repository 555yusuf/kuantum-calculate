const asyncHandler = require('express-async-handler');
const { getMovementsService } = require('../services/getMovements.service');

const getMovements = asyncHandler(async (req, res) => {
  const serviceRes = await getMovementsService(req);
  if (serviceRes.err) {
    return res.status(404).json(serviceRes.err);
  }

  if (serviceRes.message) {
    return res.status(404).json(serviceRes.message);
  }

  res.status(200).json(serviceRes.result);
});
module.exports = { getMovements };
