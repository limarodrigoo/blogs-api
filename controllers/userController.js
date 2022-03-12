const { User } = require('../models');
const { genToken } = require('../services/jwtSerice');

const createUser = async (req, res, _next) => {
  try {
    const { token } = req;
    const { displayName, email, password, image } = req.body;
    await User.create({ displayName, email, password, image });
    return res.status(201).json(token);
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: 'Algo deu errado' });
  }
};

const getAll = async (_req, res, _next) => {
  try {
    const allUsers = await User.findAll();
    return res.status(200).json(allUsers);
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: 'Algo deu errado' });
  }
};

const getById = async (req, res, _next) => {
  try {
    const { id } = req.params;

    const findUser = await User.findOne({ where: { id } });

    if (!findUser) {
      return res.status(404).json({ message: 'User does not exist' });
    }
    return res.status(200).json(findUser);
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: 'Algo deu errado' });
  }
};

const login = async (req, res, _next) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ where: { email, password } });
    if (!findUser) {
      return res.status(400).json({ message: 'Invalid fields' });
    }
    const token = genToken({ email, password });
    return res.status(200).json({ token });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: 'Algo deu errado' });
  }
};

module.exports = {
  createUser,
  getAll,
  getById,
  login,
};