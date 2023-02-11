const { Router } = require("express");
const { User, Post, Comment } = require("../../models");
const auth = require("../../utils/auth");
const router = Router();

// crrud - create, read one, read all,  update delete

//read all
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
    const postId = req.params.id;

    // find the post by its ID
    const post = await Post.findByPk(postId);

    // gate statement -- if the POST  can't be found we send back a 404-not found
    if (!post) res.status(404).json({ message: "Not found!" });

    // otherwise, if my request is true, I send back 200-ok and the actual POST that I requested
    return res.status(200).json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
});
// require user logged in with authentication
// create a post
router.get("/", auth, async (req, res) => {
  //we send a request for the post title and body to be populated into the body

  postData = {
    post_title: req.body.post_title,
    post_body: req.body.post_body,
    user_id: req.session.user_id,
  };
  try {
    const postNew = await Post.create(postData);
    //200 ok reponse is sent which indicates that the request has succeeded
    res.status(200).json(postNew);
    // if 200 is not true then 500 server error response is sent
  } catch (error) {
    res.status(500).json(error);
  }
});
// edit post

// delete post

module.exports = router;
