import connectDB from "../middleware/mongoose";
import Post from "../../models/Post"; // Correct model import
import mongoose from "mongoose";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      // Extracting data from the request body
      const { title, description, category, post_date, author, post_img } = req.body;

      // Validate required fields
      if (!title || !description || !category || !post_date || !author || !post_img) {
        return res
          .status(400)
          .json({ success: false, message: "All fields are required" });
      }

      // Check if the author ID is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(author)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid author ID" });
      }

      // Create a new post document
      const newPost = new Post({
        title,
        description,
        category,
        post_date,
        author,
        post_img,
      });

      // Save the post document to the database
      await newPost.save();

      res.status(201).json({ success: true, message: "Post added successfully" });
    } catch (error) {
      console.error("Error adding post:", error.message);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
};

export default connectDB(handler);
