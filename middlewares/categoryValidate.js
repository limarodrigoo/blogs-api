const Joi = require('joi');
const { categoryIsValid } = require('../services/categoryService');

const schema = Joi.object({
  name: Joi.string().required(),
});

const createCategoryValidate = (req, res, next) => {
  try {
    const { name } = req.body;
    const { error } = schema.validate({ name });
    if (error) {
      const { message } = error.details[0];
      return res.status(400).json({ message });
    }
    next();
  } catch (e) {
    next(e);
  }
};

const categoryExists = async (req, res, next) => {
  try {
    const { categoryIds } = req.body;
    const isValid = categoryIds.map(async (id) => categoryIsValid(id));
    Promise.all(isValid).then((result) => {
      if (result.includes(null)) {
        return res.status(400).json({ message: '"categoryIds" not found' });
      }
    });
    
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createCategoryValidate,
  categoryExists,
};