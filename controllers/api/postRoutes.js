const { Router } = require("express");
const { User, Post, Comment } = require("../../models");

const router = Router();

// crrud - create, read one, read all,  update delete

router.get("/", async (req, res) => {
  try {
    const myPosts = await Post.findAll();

    return res.status(200).json(myPosts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
});

// get post by id
router.get("/:id", async (req, res) => {
  try {
    // get the ID that I'm sending in the query params
    const postId = req.params.id

    // find the post by its ID
    const post = await Post.findByPk(postId)

    // gate statement -- if the POST  can't be found we send back a 404-not found
    if (!post) res.status(404).json({ message: "Not found!" })

    // otherwise, if my request is true, I send back 200-ok and the actual POST that I requested
    return res.status(200).json()

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }

  // create new post

  // edit post 

  // delete post
})

module.exports = router;
