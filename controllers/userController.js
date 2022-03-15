const { createNewUser, 
  findAllUsers, 
  findUserById, 
  find, 
  deleteUserById } = require('../services/userService');
const { genToken } = require('../services/jwtSerice');

const createUser = async (req, res, next) => {
  try {
    const { token } = req;
    const { displayName, email, password, image } = req.body;
    await createNewUser(displayName, email, password, image);
    return res.status(201).json(token);
  } catch (e) {
    next(e);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const allUsers = await findAllUsers();
    return res.status(200).json(allUsers);
  } catch (e) {
    next(e);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const findUser = await findUserById(id);

    if (!findUser) {
      return res.status(404).json({ message: 'User does not exist' });
    }
    return res.status(200).json(findUser);
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const findUser = await find(email, password);
    if (!findUser) {
      return res.status(400).json({ message: 'Invalid fields' });
    }
    const token = genToken({ email, password });
    return res.status(200).json({ token });
  } catch (e) {
    next(e);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req;
    console.log(id, '>>>>>>>>>>>>>>>ID<<<<<<<<<<<<<<<<');
    await deleteUserById(id);
    return res.status(204).end();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createUser,
  getAll,
  getById,
  login,
  deleteUser,
};