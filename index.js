import express from "express";
import mongoose from "mongoose";

const app = express();
const port = 3000;

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// MongoDB Atlas connection string
const connectionString =
  "mongodb+srv://admin-Jackson:jaydenjackson1@cluster0.bnu3c.mongodb.net/blog?retryWrites=true&w=majority";

// Connect to MongoDB Atlas
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check if the connection is successful
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB Atlas");
});

//schema for the posts
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
});

// model based on the schema
const Post = mongoose.model("Post", postSchema);

// Routes
app.use(express.static("public"));

app.get("/", async (req, res) => {
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

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

app.get("/create-post", (req, res) => {
  res.render("create-post.ejs");
});

app.post("/create-post", async (req, res) => {
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

app.post("/edit-post/:id", async (req, res) => {
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

app.get("/edit-post/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    res.render("edit-post.ejs", { post });
  } catch (error) {
    console.error("Error fetching post for editing:", error);
    res.status(500).send("Error fetching post for editing");
  }
});

app.post("/delete-post/:id", async (req, res) => {
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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
