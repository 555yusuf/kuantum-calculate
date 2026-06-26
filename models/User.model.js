const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const passwordComplexity = require("joi-password-complexity");
const Joi = require("joi");

//? User Schema
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 1,
      maxlength: 200,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    age: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

//? Generate token

UserSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY);
};

// User Model
const User = mongoose.model("User", UserSchema);

//! Validation

//? Validate register user
const validateRegister = (obj) => {
  const Schema = Joi.object({
    email: Joi.string().required().trim().email(),
    username: Joi.string().min(1).max(200),
    password: passwordComplexity().required(),
    age: Joi.string().required(),
  });
  return Schema.validate(obj);
};

//? Validate update user
const validateUpdate = (obj) => {
  const Schema = Joi.object({
    email : Joi.string().min(3),
    username: Joi.string().min(1).max(200),
    age: Joi.number(),
  });
  return Schema.validate(obj);
};

//? Validate Login user
const validateLogin = (obj) => {
  const Schema = Joi.object({
    email: Joi.string().required().trim().email(),
    password: Joi.string().required().trim(),
  });
  return Schema.validate(obj);
};

//? validate reset password
const validateResetPassword = (obj) => {
  const schema = Joi.object({
    password: passwordComplexity().required(),
  });
  return schema.validate(obj);
};

module.exports = {
  User,
  validateLogin,
  validateRegister,
  validateResetPassword,
  validateUpdate,
};
