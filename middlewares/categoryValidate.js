const Joi = require('joi');
const { Category } = require('../models');

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

const categoryExists = (req, res, next) => {
  try {
    const { categoryIds } = req.body;
    categoryIds.forEach(async (cat) => { 
      const exists = await Category.findOne({ where: { id: cat } });
      if (!exists) return res.status(400).json({ message: '"categoryIds" not found' });
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