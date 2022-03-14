const { getUserIdByToken } = require('../services/jwtSerice');
const { createNewPost, findAllPosts,
  findPostByIdFiltered,
  findPostById, editPostById, findPostEdited } = require('../services/postService');
const { createPostCategory } = require('../services/postCategoryService');

const createPost = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { title, content, categoryIds } = req.body;

    const id = getUserIdByToken(authorization);

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

const editPost = async (req, res, next) => {
  try {
    const { id: postId } = req.params;
    const { authorization } = req.headers;
    const { title, content } = req.body;

    const userId = await getUserIdByToken(authorization);
    console.log(userId, 'userId');

    const post = await findPostById(postId);
    console.log(post.dataValues.userId, 'postId');
    if (post.dataValues.userId !== userId) {
      return res.status(401).json({ message: 'Unauthorized user' });
    }
    await editPostById(postId, title, content);
    const newPost = await findPostEdited(postId);

    return res.status(200).json(newPost);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  editPost,
};