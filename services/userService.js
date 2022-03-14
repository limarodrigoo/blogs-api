const { User } = require('../models');

const findUserByEmail = async (email) => User.findOne({ where: { email } });

const createNewUser = async (displayName, email, password, image) =>
  User.create({ displayName, email, password, image });

const findAllUsers = async () => User.findAll();

const findUserById = async (id) => User.findOne({ where: { id } });

const find = async (email, password) => User.findOne({ where: { email, password } });

module.exports = {
  findUserByEmail,
  createNewUser,
  findAllUsers,
  findUserById,
  find,
};