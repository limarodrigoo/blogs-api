const express = require('express');
const { createPost, getAllPosts } = require('../controllers/postController');
const { checkToken } = require('../middlewares/jwtToken');
const { createPostValidate } = require('../middlewares/postValidate');
const { categoryExists } = require('../middlewares/categoryValidate');

const router = express.Router();

router.post('/', createPostValidate, categoryExists, checkToken, createPost);
router.get('/', checkToken, getAllPosts);

module.exports = router;