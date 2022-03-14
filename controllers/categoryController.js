const { createNewCategory, findAllCategories } = require('../services/categoryService');

const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const newCategory = await createNewCategory(name);
    return res.status(201).json(newCategory);
  } catch (e) {
    next(e);
  }
};

const getAllCategories = async (_req, res, next) => {
  try {
    const allCategories = await findAllCategories();
    return res.status(200).json(allCategories);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createCategory,
  getAllCategories,
};