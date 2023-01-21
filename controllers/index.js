const { Router } = require("express");

const homeRoutes = require("./homeRoutes");

const router = Router();

router.use("/", homeRoutes);

module.exports = router;
