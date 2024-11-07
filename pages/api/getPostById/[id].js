// /pages/api/getPostById/[id].js
import connectDB from "../../middleware/mongoose";
import Post from "../../../models/Post";

const handler = async (req, res) => {
  const { id } = req.query;  // The dynamic segment is captured as 'id'

  console.log("Received postId:", id);  // Log the id to ensure it's correct

  try {
    const post = await Post.findById(id);  // Use the id in your database query
    if (post) {
      res.status(200).json({ success: true, data: post });
    } else {
      res.status(404).json({ success: false, message: "Post not found" });
    }
  } catch (error) {
    console.error("Error fetching post:", error.message);
    res.status(500).json({ success: false, message: "Error fetching post" });
  }
};

export default connectDB(handler);
