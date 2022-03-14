const { PostCategory } = require('../models');

const createPostCategory = async (postId, categoryId) =>
  PostCategory.create({ postId, categoryId });

module.exports = {
  createPostCategory,
};