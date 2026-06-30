const Joi = require("joi");
const {
  companySymbol,
  companySymbolAndName,
} = require("../models/companySymbol.model"); //* Tum sembollerin isimleri

//? Kullanicinin verdigi bilgilerin dogrulugunu kontrol eder
function validatePriceRequest(obj) {
  const schema = Joi.object({
    sDate: Joi.date().required(),
    eDate: Joi.date().required(),
    symbol: Joi.string()
      .valid(...companySymbol)
      .required(),
  });
  return schema.validate(obj);
}

function validateForDataRequest(obj) {
  const schema = Joi.object({
    buyDate: Joi.date().required(),
    saleDate: Joi.date().required(),
    amount: Joi.number().required(),
    symbol: Joi.string()
      .valid(...companySymbol)
      .required(),
  });
  return schema.validate(obj);
}
function validateInvestment (obj){
  const schema = Joi.object({
    date : Joi.date().required(),
    amount : Joi.number().required(),
    symbol : Joi.string().valid(...companySymbol).required() 
  })
  return schema.validate(obj);
}

function validateFor_dca_(obj) {
  const schema = Joi.object({
    sDate: Joi.date().required(),
    eDate: Joi.date().required(),
    amount: Joi.number().required(),
    symbol: Joi.string()
      .valid(...companySymbol)
      .required(),
  });
  return schema.validate(obj);
}

const IsValidateWeekend = (dateString) => {
  const dayIndex = new Date(dateString).getDay();
  return dayIndex === 0 || dayIndex === 6;
};

//? Sirketlerin sembolleri ve isimleri veren fonk.
function getCompanySymbol() {
  return companySymbolAndName;
}

module.exports = {
  validatePriceRequest,
  getCompanySymbol,
  validateForDataRequest,
  validateFor_dca_,
  IsValidateWeekend,
  validateInvestment,
};
