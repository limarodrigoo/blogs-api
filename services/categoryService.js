const { Category } = require('../models');

const categoryIsValid = async (cat) => {
  const found = Category.findOne({ where: { id: cat } });
  return found;
};

const createNewCategory = async (name) =>
  Category.create({ name });

const findAllCategories = async () => Category.findAll();

module.exports = {
  categoryIsValid,
  createNewCategory,
  findAllCategories,
};