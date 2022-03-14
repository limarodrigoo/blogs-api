const modelAssociate = (models) => {
  models.BlogPost.belongsToMany(models.Category, {
    as: 'categories',
    through: 'PostCategory',
    foreingKey: 'postId',
    otherKey: 'categoryId',
  });
  models.Category.belongsToMany(models.BlogPost, {
    as: 'posts',
    through: 'PostCategory',
    foreingKey: 'categoryId',
    otherKey: 'postId',
  });
  return models;
};

module.exports = (sequelize) => {
  const PostCategory = sequelize.define('PostCategory',
    {},
    { timestamps: false,
    tableName: 'PostsCategories' });
    
    PostCategory.associate = (models) => modelAssociate(models);
 
  return PostCategory;
};