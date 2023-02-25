const { Router } = require("express");
const { Post } = require("../models");

// router.get("/", async (req, res) => {
//try {
//const allPosts = await Post.findAll();

//const posts = { data: allPosts };
//res.status(200).render("home", {
//  posts,
//});
//} catch (error) {
//res.status(500).json({ error: "Something went wrong" });
// }
//});

const router = Router();
router.get("/", async (req, res) => {
  try {
    const allPosts = await Post.findAll();

    //const posts = { data: allPosts };

    const posts = allPosts.map((post) => post.get({ plain: true }));

    console.log(posts);
    res.status(200).render("home", {
      posts,
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/profile", async (req, res) => {
  try {
    const currentLoggedInUser = req.session.user_id;

    if (currentLoggedInUser) {
      const posts = await Post.findAll({
        where: { user_id: currentLoggedInUser },
      });

      console.log(posts);

      return res.status(200).render("profile", { posts });
    }

    return res
      .status(404)
      .json({ message: "Couldnot find posts for this user" });
  } catch (error) {
    return res.status(500).json({ error: "Oops, error!" });
  }
});

router.get("/login", (req, res) => {
  try {
    res.status(200).render("login");
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
