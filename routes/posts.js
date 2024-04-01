import express from "express";
import Post from "../models/Post.js";

const router = express.Router();

router.get("/create-post", (req, res) => {
  res.render("create-post.ejs");
});

router.post("/create-post", async (req, res) => {
  const title = req.body.title;
  const content = req.body.content;

  try {
    // Create a new post document
    const newPost = new Post({ title, content });
    // Save the post to the database
    await newPost.save();
    console.log("Post saved successfully!");
    // Redirect the user back to the home page or any other page
    res.redirect("/");
  } catch (error) {
    console.error("Error saving post:", error);
    // Handle error
    res.status(500).send("Error saving post");
  }
});

router.post("/edit-post/:id", async (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;
  try {
    // Find the post by ID and update its title and content
    await Post.findByIdAndUpdate(postId, { title, content });
    console.log("Post updated successfully!");
    res.redirect("/");
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).send("Error updating post");
  }
});

router.get("/edit-post/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    res.render("edit-post.ejs", { post });
  } catch (error) {
    console.error("Error fetching post for editing:", error);
    res.status(500).send("Error fetching post for editing");
  }
});

router.post("/delete-post/:id", async (req, res) => {
  const postId = req.params.id;
  try {
    // Find the post by ID and delete it
    await Post.findByIdAndDelete(postId);
    console.log("Post deleted successfully!");
    res.redirect("/");
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).send("Error deleting post");
  }
});

export default router;
