const { DataTypes } = require('sequelize');

const Attributes = {
  id: { 
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  title: DataTypes.STRING,
  content: DataTypes.STRING,
  userId: {
    type: DataTypes.INTEGER,
    foreingKey: true,
  },
  published: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
};

module.exports = (sequelize) => {
  const BlogPost = sequelize.define(
    'BlogPost',
    Attributes,
    {
      timestamps: false,
      tableName: 'BlogPosts',
    },
  );
  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, {
      foreingKey: 'userId', as: 'user',
    });
  };
  return BlogPost;
};
