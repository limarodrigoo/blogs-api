const express = require('express');
const { createPost,
  getAllPosts,
  getPostById,
  editPost,
  deletePost } = require('../controllers/postController');
const { checkToken } = require('../middlewares/jwtToken');
const {
  createPostValidate,
  idPostValidate,
  editPostValidate,
  permisionValidate,
  postExist,
} = require('../middlewares/postValidate');
const { categoryExists } = require('../middlewares/categoryValidate');

const router = express.Router();

router.use(checkToken);

router.post('/', createPostValidate, categoryExists, createPost);
router.get('/', getAllPosts);
router.get('/:id', idPostValidate, getPostById);
router.put('/:id', editPostValidate, permisionValidate, editPost);
router.delete('/:id', postExist, permisionValidate, deletePost);

module.exports = router;