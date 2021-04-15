const express = require("express");
const postsController = require("../controllers/posts.controller");
const checkAuthMiddleware = require("../middlewares/checkAuth");

const router = express.Router();

// Define endpoint
router.post("/", checkAuthMiddleware.checkAuth, postsController.save);
router.get("/:id", postsController.show);
router.patch("/:id", checkAuthMiddleware.checkAuth, postsController.update);
router.delete("/:id", checkAuthMiddleware.checkAuth, postsController.destroy);
router.get("/", postsController.getAll);

module.exports = router;
