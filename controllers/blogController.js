const Blog = require("../models/Blog");

// CREATE BLOG
const createBlog = async (req, res) => {
  try {
    const { title, content, category } = req.body;

    // User must be logged in — req.session.user available
    if (!req.session.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const blog = new Blog({
      title,
      content,
      category,
      author: req.session.user._id,
    });

    await blog.save();
    res.status(201).json({ message: "Blog created successfully", blog });
  } catch (error) {
    console.error("Create blog error:", error);
    res.status(500).json({ message: "Server error while creating blog" });
  }
};

// GET ALL BLOGS + FILTER (category + search)
const getBlogs = async (req, res) => {
  try {
    const { search, category } = req.query;
    let filter = {};

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }
    if (category) {
      filter.category = category;
    }

    const blogs = await Blog.find(filter).populate("author", "username");
    res.json(blogs);
  } catch (error) {
    console.error("Get blogs error:", error);
    res.status(500).json({ message: "Server error while fetching blogs" });
  }
};

// UPDATE BLOG
const updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;

    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // Only author can update
    if (!blog.author.equals(req.session.user._id)) {
      return res.status(403).json({ message: "Not allowed to update" });
    }

    const { title, content, category } = req.body;
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.category = category || blog.category;

    await blog.save();
    res.json({ message: "Blog updated successfully", blog });
  } catch (error) {
    console.error("Update blog error:", error);
    res.status(500).json({ message: "Server error while updating blog" });
  }
};

// DELETE BLOG
const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;

    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // Only author can delete
    if (!blog.author.equals(req.session.user._id)) {
      return res.status(403).json({ message: "Not allowed to delete" });
    }

    await blog.deleteOne();
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Delete blog error:", error);
    res.status(500).json({ message: "Server error while deleting blog" });
  }
};

module.exports = {
  createBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
};
