const { Router } = require("express");
const { User, Post, Comment } = require("../../models");
const authjs = require("../../utils/auth");
const router = Router();

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
router.post("/", async (req, res) => {
  //we send a request for the post title and body to be populated into the body

  postData = {
    name: req.body.name,
    description: req.body.description,
    user_id: req.session.user_id,
  };

  console.log(postData);

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

router.put("/:id", async (req, res) => {
  console.log(req.body);
  console.log(req.params.id);
  Post.update(
    {
      // All the fields you can update and the data attached to the request body.
      name: req.body.title,
      description: req.body.body,
    },
    {
      // Gets a book based on the book_id given in the request parameters
      where: {
        id: req.params.id,
      },
    }
  );
});
// router.put"/:id", (req, res) => {}
// delete post
router.delete("/:id", (req, res) => {
  // Looks for the books based book_id given in the request parameters
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedpost) => {
      res.json(deletedpost);
    })
    .catch((err) => res.json(err));
});
module.exports = router;
