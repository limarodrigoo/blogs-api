const express = require('express');
const { createPost, getAllPosts, getPostById } = require('../controllers/postController');
const { checkToken } = require('../middlewares/jwtToken');
const { createPostValidate, idPostValidate } = require('../middlewares/postValidate');
const { categoryExists } = require('../middlewares/categoryValidate');

const router = express.Router();

router.use(checkToken);

router.post('/', createPostValidate, categoryExists, createPost);
router.get('/', getAllPosts);
router.get('/:id', idPostValidate, getPostById);

module.exports = router;