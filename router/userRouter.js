const express = require('express');
const { createUser, getAll, getById, deleteUser } = require('../controllers/userController');
const { createUserValidate } = require('../middlewares/createUserValidate');
const { generateToken, checkToken } = require('../middlewares/jwtToken');
const { getUserId } = require('../middlewares/loginUserValidate');

const router = express.Router();

router.post('/', createUserValidate, generateToken, createUser);
router.get('/', checkToken, getAll);
router.get('/:id', checkToken, getById);
router.delete('/me', checkToken, getUserId, deleteUser);

module.exports = router;