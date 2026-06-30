const { number, required, symbol, string } = require('joi');
const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 10,
    },
    funds: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    symbol: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Investment = mongoose.model('Investment', investmentSchema);
module.exports = { Investment };
