const { DataTypes } = require('sequelize');

const Attributes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: DataTypes.STRING,
};

module.exports = (sequelize) => {
  const Category = sequelize.define('Category', Attributes, {
    timestamp: false,
    tableName: 'Categories',
  });
  
  return Category;
};
