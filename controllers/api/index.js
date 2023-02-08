const { Router } = require("express");
const { route } = require("./postRoutes");
const postRoutes = require("./postRoutes");

const router = Router();

// const apiRoutes = require("./api");

route.use("/, homeRoutes");
// router.use("/api", apiRoutes);
router.use("/posts", postRoutes);

module.exports = router;
