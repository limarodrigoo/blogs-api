const { BlogPost, User, PostCategory, Category } = require('../models');
const { isValidToken } = require('../services/jwtSerice');

const createPost = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { title, content, categoryIds } = req.body;

    const { email } = isValidToken(authorization);
    const { id } = await User.findOne({ where: { email } });
    const newPost = await BlogPost.create({ title, userId: id, content });
    const categoriesPost = categoryIds.map((cat) =>
      PostCategory.create({ postId: newPost.id, CategoryId: cat }));
    console.log(categoriesPost);
    Promise.all(categoriesPost);
    return res.status(201).json(newPost);
  } catch (e) {
    next(e);
  }
};

const getAllPosts = async (req, res, next) => {
  try {
    const allPosts = await BlogPost
      .findAll({
        include:
          [
            { model: User, as: 'user', attributes: { exclude: 'password' } },
            { model: Category, as: 'categories' },
          ],
        attributes: { exclude: 'UserId' },
      });
    return res.status(200).json(allPosts);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createPost,
  getAllPosts,
};