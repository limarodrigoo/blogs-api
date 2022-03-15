const Joi = require('joi');
const { findPostById } = require('../services/postService');
const { getUserIdByToken } = require('../services/jwtSerice');

const schema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().required(),
});

const editSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.any().forbidden()
    .messages({
      'any.unknown': 'Categories cannot be edited',
    }),
});

const createPostValidate = (req, res, next) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { error } = schema.validate({ title, content, categoryIds });
    if (error) {
      const { message } = error.details[0];
      return res.status(400).json({ message });
    }

    next();
  } catch (e) {
    next(e);
  }
};

const idPostValidate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await findPostById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post does not exist' });
    }
    next();
  } catch (e) {
    next(e);
  }
};

const editPostValidate = (req, res, next) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { error } = editSchema.validate({ title, content, categoryIds });
    if (error) {
      const { message } = error.details[0];
      return res.status(400).json({ message });
    }
    next();
  } catch (e) {
    next(e);
  }
};

const permisionValidate = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { id: postId } = req.params;
    
    console.log(postId, '>>>>>>>>>>POSTID<<<<<<<<<<<<<<');
    const userId = await getUserIdByToken(authorization);
  
    const post = await findPostById(postId);
  
    if (post.dataValues.userId !== userId) {
      return res.status(401).json({ message: 'Unauthorized user' });
    }
  } catch (e) {
    next(e);
  }
  next();
};

const postExist = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id, '>>>>>>>>>>ID<<<<<<<<<<<<<<');
  
    const result = await findPostById(id);
    if (!result) res.status(404).json({ message: 'Post does not exist' });
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createPostValidate,
  idPostValidate,
  editPostValidate,
  permisionValidate,
  postExist,
};