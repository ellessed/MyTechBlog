const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

//user has many posts with user ID
User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

//post belongs to user
Post.belongsTo(User, {
  foreignKey: "user_id",
});

Post.hasMany(Comment, {
  foreignKey: "post_id",
});

Comment.belongsTo(Post, {
  foreignKey: "post_id",
});

//user has many comments with user id
User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

//comment belongs to user
Comment.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Post, Comment };
