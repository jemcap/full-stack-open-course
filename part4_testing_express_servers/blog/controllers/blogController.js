const blogRouter = require("express").Router();
const Blog = require("../models/blogSchema");
const { infoLog, errorLog } = require("../utils/logger");

blogRouter.get("/", async (req, res, next) => {
  try {
    const getAllPosts = await Blog.find({});
    if (getAllPosts) {
      return res.status(200).json(getAllPosts);
    }
    return res.status(400).send({ error: "Unable to retrieve posts." });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});

blogRouter.post("/", async (req, res, next) => {
  const { title, author, url, likes } = req.body;

  if (!title && !author)
    return res.status(400).send({ error: "Missing title" });

  try {
    const newPost = new Blog({
      title,
      author,
      url,
      likes,
    });
    if (newPost) {
      const savedPost = await newPost.save();
      return res.status(201).json(savedPost);
    }
    return res.status(400).send({ error: "Error creating new post" });
  } catch (error) {
    errorLog(error.message);
    next(error);
  }
});

blogRouter.delete("/:id", async (req, res, next) => {
  const id = req.params.id;

  try {
    const deletePost = await Blog.findByIdAndDelete(id);
    if (deletePost) {
      return res
        .status(200)
        .json({ data: deletePost, message: "Post successfully deleted." });
    }
    return res.status(400).send({ error: "Error deleting post." });
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;
