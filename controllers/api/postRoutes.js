const { Router } = require("express");
const { User, Post, Comment } = require("../../models");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const myPosts = await Post.findAll();

    return res.status(200).json(myPosts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
});

module.exports = router;
