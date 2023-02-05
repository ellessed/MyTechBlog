const { Router } = require("express");

const homeRoutes = require("./homeRoutes");
const apiRoutes = require("./api");

const router = Router();

router.use("/api", apiRoutes);
router.use("/", homeRoutes);

module.exports = router;
