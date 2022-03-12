module.exports = (sequelize) => {
  const PostCategory = sequelize.define('PostCategorie',
    {},
    { timestamps: false });
  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategory,
      foreingKey: 'postId',
      otherKey: 'categoryId',
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'posts',
      through: PostCategory,
      foreingKey: 'categoryId',
      otherKey: 'postId',
    });
  };
  return PostCategory;
};