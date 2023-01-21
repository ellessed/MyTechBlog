const { Router } = require("express");

const router = Router();

// here is where I'd put the routes if I had any
router.get("/", (req, res) => {
  try {
    res.status(200).render("home");
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
