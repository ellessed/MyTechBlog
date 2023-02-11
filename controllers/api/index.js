const { Router } = require("express");
const postRoutes = require("./postRoutes");
const commentRoutes = require("./commentRoutes");
const authRoutes = require("./userRoutes");

const router = Router();

router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);
router.use("/auth", authRoutes);

module.exports = router;
