const { Router } = require("express");
const { Post } = require("../models");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const allPosts = await Post.findAll();

    const posts = { data: allPosts };
    res.status(200).render("home", {
      posts,
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
