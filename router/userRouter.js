const express = require('express');
const { createUser, getAll, getById } = require('../controllers/userController');
const { createUserValidate } = require('../middlewares/createUserValidate');
const { generateToken, checkToken } = require('../middlewares/jwtToken');

const router = express.Router();

router.post('/', createUserValidate, generateToken, createUser);
router.get('/', checkToken, getAll);
router.get('/:id', checkToken, getById);

module.exports = router;