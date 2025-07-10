const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const isAuthenticated = require("../Middlewares/isAuthenticated");

router.post("/", isAuthenticated, blogController.createBlog);
router.get("/", blogController.getBlogs);
router.put("/:id", isAuthenticated, blogController.updateBlog);
router.delete("/:id", isAuthenticated, blogController.deleteBlog);

module.exports = router;
