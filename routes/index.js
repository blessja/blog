import express from "express";
import Post from "../models/Post.js";

const router = express.Router();

// Define routes
router.get("/", async (req, res) => {
  try {
    // Fetch all posts from MongoDB
    const posts = await Post.find();
    // Render the home page view and pass the posts data
    res.render("index.ejs", { posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).send("Error fetching posts");
  }
});

router.get("/about", (req, res) => {
  res.send("About page");
});

export default router;
