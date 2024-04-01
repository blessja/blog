// db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connectionString =
      "mongodb+srv://admin-Jackson:jaydenjackson1@cluster0.bnu3c.mongodb.net/blog?retryWrites=true&w=majority";
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process with failure
  }
};
export default connectDB;
