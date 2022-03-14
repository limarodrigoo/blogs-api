const express = require('express');
const { createPost, getAllPosts, getPostById, editPost } = require('../controllers/postController');
const { checkToken } = require('../middlewares/jwtToken');
const { createPostValidate,
  idPostValidate,
  editPostValidate } = require('../middlewares/postValidate');
const { categoryExists } = require('../middlewares/categoryValidate');

const router = express.Router();

router.use(checkToken);

router.post('/', createPostValidate, categoryExists, createPost);
router.get('/', getAllPosts);
router.get('/:id', idPostValidate, getPostById);
router.put('/:id', editPostValidate, editPost);

module.exports = router;