const Joi = require('joi');
const { getUserIdByToken } = require('../services/jwtSerice');

const schema = Joi.object({
  email: Joi.string().email().required().empty()
  .invalid('')
  .messages({
    'any.invalid': '"email" is not allowed to be empty',

  }),
  password: Joi.string().required().min(0).empty()
    .invalid('')
    .messages({
      'string.min': '"password" length must be 6 characters long',
      'any.invalid': '"password" is not allowed to be empty',
    }),
});

const loginUserValidate = (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { error } = schema.validate({ email, password });
    if (error) {
      const { message } = error.details[0];
      return res.status(400).json({ message });
    }
    next();
  } catch (e) {
    next(e);
  }
};

const getUserId = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const id = await getUserIdByToken(authorization);
    if (!id) return res.status(404).json({ message: 'User not found' });
    req.id = id;
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = { loginUserValidate, getUserId };