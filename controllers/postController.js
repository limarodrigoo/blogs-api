const { isValidToken } = require('../services/jwtSerice');
const { createNewPost, findAllPosts, findPostByIdFiltered } = require('../services/postService');
const { findUserByEmail } = require('../services/userService');
const { createPostCategory } = require('../services/postCategoryService');

const createPost = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { title, content, categoryIds } = req.body;

    const { email } = isValidToken(authorization);
    const { id } = await findUserByEmail(email);
    const newPost = await createNewPost(title, content, id);
    const categoriesPost = categoryIds.map((cat) =>
      createPostCategory(newPost.id, cat));
    await Promise.all(categoriesPost);
    return res.status(201).json(newPost);
  } catch (e) {
    next(e);
  }
};

const getAllPosts = async (_req, res, next) => {
  try {
    const allPosts = await findAllPosts();
    return res.status(200).json(allPosts);
  } catch (e) {
    next(e);
  }
};

const getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const allPosts = await findPostByIdFiltered(id);
    return res.status(200).json(allPosts);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
};