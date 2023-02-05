const sequelize = require("../config/connection");
const userData = require("./userData.json");
const commentData = require("./commentData.json");
const postsData = require("./postData.json");
const { User, Comment, Post } = require("../models");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData);
  await Post.bulkCreate(postsData);
  await Comment.bulkCreate(commentData);

  process.exit(0);
};

seedAll();
