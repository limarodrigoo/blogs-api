const { BlogPost, User, Category } = require('../models');

const createNewPost = async (title, content, userId) => {
  const newPost = await BlogPost.create({ title, userId, content });
  return newPost;
};

const findAllPosts = async () => {
  const allPosts = await BlogPost
    .findAll({
      include:
        [
          { model: User, as: 'user', attributes: { exclude: 'password' } },
          { model: Category, as: 'categories' },
        ],
      attributes: { exclude: 'UserId' },
    });
  return allPosts;
};

const findPostByIdFiltered = async (id) => {
  const allPosts = await BlogPost
    .findOne({
      where: { id },
      include:
        [
          { model: User, as: 'user', attributes: { exclude: 'password' } },
          { model: Category, as: 'categories' },
        ],
      attributes: { exclude: 'UserId' },
    });
  return allPosts;
};

const findPostById = async (id) => BlogPost.findOne({ where: { id } });

module.exports = {
  createNewPost,
  findAllPosts,
  findPostByIdFiltered,
  findPostById,
};