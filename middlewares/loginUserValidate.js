const Joi = require('joi');

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

const loginUserValidate = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { error } = schema.validate({ email, password });
    if (error) {
      const { message } = error.details[0] || error;
      return res.status(400).json({ message });
    }
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = { loginUserValidate };