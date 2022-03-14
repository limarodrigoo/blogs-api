const Joi = require('joi');

const schema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().required(),
});

const createPostValidate = (req, res, next) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { error } = schema.validate({ title, content, categoryIds });
    if (error) {
      const { message } = error.details[0];
      return res.status(400).json({ message });
    }
    
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createPostValidate,
};