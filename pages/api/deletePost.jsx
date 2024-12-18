import connectDB from "../middleware/mongoose";
import Post from "../../models/Post";

const handler = async (req, res) => {
  if (req.method === "DELETE") {
    const { id } = req.query; // Get post ID from query parameter

    if (!id) {
      return res.status(400).json({ success: false, message: "Post ID is required" });
    }

    try {
      // Find the post by ID and delete it
      const post = await Post.findById(id);
      if (!post) {
        return res.status(404).json({ success: false, message: "Post not found" });
      }

      // Optionally: You can also delete the image file associated with the post if needed
      const fs = require("fs");
      const path = require("path");
      // const postImagePath = path.join(process.cwd(), "public", "uploads", post.post_img);

      // // Check if the image exists, and delete it
      // if (fs.existsSync(postImagePath)) {
      //   fs.unlinkSync(postImagePath);
      // }

      // Decrement the `post` count in the corresponding category
      const { category } = post; // Assuming `category` contains the category name
      const updatedCategory = await Category.findOneAndUpdate(
        { category_name: category },
        { $inc: { post: -1 } }, // Decrement post count by 1
        { new: true } // Return the updated document
      );

      if (!updatedCategory) {
        console.warn(`Category with name "${category}" not found.`);
      }

      // Delete the post from the database
      await Post.deleteOne({ _id: id });

      return res.status(200).json({ success: true, message: "Post deleted successfully" });
    } catch (error) {
      console.error("Error deleting post:", error.message);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  } else {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }
};

export default connectDB(handler);
