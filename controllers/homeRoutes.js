const { Router } = require("express");
const { Post, User } = require("../models");

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
    const allPosts = await Post.findAll({
      include: [{ model: User, attributes: ["name"] }],
    });

    const posts = allPosts.map((post) => post.get({ plain: true }));

    //console.log(posts);
    res.status(200).render("home", {
      posts,
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});
// get single post
router.get("/post/:id", async (req, res) => {
  console.log("post id: " + req.params.id);
  try {
    const postData = await Post.findByPk(req.params.id, {});

    if (postData) {
      const post = postData.get({ plain: true });
      console.log(post);
      res.render("post", { post });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile", async (req, res) => {
  try {
    const currentLoggedInUser = req.session.user_id;
    console.log("Logged in as user:" + currentLoggedInUser);
    if (currentLoggedInUser) {
      const postsFromDb = await Post.findAll({
        where: {
          user_id: currentLoggedInUser,
        },
      });

      const posts = postsFromDb.map((post) => post.get({ plain: true }));

      console.log(posts);

      return res.status(200).render("profile", {
        posts: posts,
        loggedIn: currentLoggedInUser,
        userName: req.session.name,
      });
    }

    return res.status(200).render("login");

    // .status(404)
    // .json({ message: "Couldn't find posts for this user" });
  } catch (error) {
    console.log(error);
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

router.get("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.redirect("/");
    });
  } else {
    return res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
