const Joi = require('joi');
const { findUserByEmail } = require('../services/userService');

const schema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  image: Joi.string(),
  password: Joi.string().min(6).required()
  .messages({ 'string.min': '"password" length must be 6 characters long' }),
});

const createUserValidate = async (req, res, next) => {
  try {
    const { displayName, email, password, image } = req.body;
    const { error } = schema.validate({ displayName, email, password, image });
    if (error) {
      const { message } = error.details[0] || error;
      return res.status(400).json({ message });
    }
    const emailExists = await findUserByEmail(email);
    if (emailExists) {
      return res.status(409).json({ message: 'User already registered' });
    }

    req.user = { displayName, email, password, image };

    next();
  } catch (e) {
    next(e);
  }
};

module.exports = { createUserValidate };