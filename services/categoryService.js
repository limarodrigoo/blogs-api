const { Category } = require('../models');

const categoryIsValid = async (cat) => {
  const found = Category.findOne({ where: { id: cat } });
  return found;
};

module.exports = { 
  categoryIsValid,
};