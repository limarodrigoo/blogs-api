const express = require('express');
const { login } = require('../controllers/userController');
const { loginUserValidate } = require('../middlewares/loginUserValidate');

const router = express.Router();

router.post('/', loginUserValidate, login);

module.exports = router;