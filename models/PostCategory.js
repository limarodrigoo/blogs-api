const modelAssociate = (models) => {
  models.BlogPost.belongsToMany(models.Category, {
    as: 'categories',
    through: 'PostsCategories',
    foreignKey: 'postId',
    otherKey: 'categoryId',
  });
  models.Category.belongsToMany(models.BlogPost, {
    as: 'posts',
    through: 'PostsCategories',
    foreignKey: 'categoryId',
    otherKey: 'postId',
  });
};

module.exports = (sequelize) => {
  const PostCategory = sequelize.define('PostCategory',
    {},
    {
      tableName: 'PostsCategories',
      timestamps: false,
    });

  PostCategory.associate = modelAssociate;

  return PostCategory;
};