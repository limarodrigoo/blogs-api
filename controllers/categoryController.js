const { Category } = require('../models');

const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const newCategory = await Category.create({ name });
    return res.status(201).json(newCategory);
  } catch (e) {
    next(e);
  }
};

const getAllCategories = async (_req, res, next) => {
  try {
    const allCategories = await Category.findAll();
    return res.status(200).json(allCategories);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createCategory,
  getAllCategories,
};