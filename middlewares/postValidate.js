const Joi = require('joi');
const { findPostById } = require('../services/postService');

const schema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().required(),
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

module.exports = {
  createPostValidate,
  idPostValidate,
};