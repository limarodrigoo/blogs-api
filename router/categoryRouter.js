const express = require('express');
const { createCategory, getAllCategories } = require('../controllers/categoryController');
const { checkToken } = require('../middlewares/jwtToken');
const { createCategoryValidate } = require('../middlewares/categoryValidate');

const router = express.Router();

router.post('/', createCategoryValidate, checkToken, createCategory);
router.get('/', checkToken, getAllCategories);

module.exports = router;
