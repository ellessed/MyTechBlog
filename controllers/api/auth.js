const router = require("express").Router();
const { User } = require("../../models");

// router.post("/sign-up", async (req, res) => {
//   try {
//     const userData = await User.create(req.body);

//     req.session.save(() => {
//       req.session.user_id = userData.id;
//       req.session.logged_in = true;

//       // WIP
//       res.status(200).json(userData);
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.name = req.body.name;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/log-in", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    // ensuring the user exists in the database
    if (!userData)
      res.status(404).json({
        message: "Your username or password is incorrect, please try again",
      });

    // checking if the password the user typed in the input box matches the one in the db
    const validPassword = userData.checkPassword(req.body.password);

    if (!validPassword) {
      return res.status(400).json({
        message: "Your username or password is incorrect, please try again",
      });
    }

    console.log(userData, validPassword);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.email = userData.email;
      req.session.name = req.body.name;
      req.session.logged_in = true;

      res.json({ message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json({ err });
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(200).render("home");
      // res.;
    });
  } else {
    // check .end() method
    res.status(500).end();
  }
});

module.exports = router;
