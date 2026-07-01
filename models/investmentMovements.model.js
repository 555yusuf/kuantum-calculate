const { number, required, symbol, string } = require('joi');
const mongoose = require('mongoose');
const MovementsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    transaction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'investments',
      required: true,
    },
    transaction_type: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
const Movements = mongoose.model('Movements', MovementsSchema);
module.exports = { Movements };
