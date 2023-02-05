const { Router } = require("express");
const postRoutes = require("./postRoutes");

const router = Router();

router.use("/posts", postRoutes);
// we will also have /comments and /auth or /user here

module.exports = router;
