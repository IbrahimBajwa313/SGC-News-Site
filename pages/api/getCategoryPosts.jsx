import connectDB from "../middleware/mongoose";
import Category from "../../models/Category"; // Assuming you have a Category model
import Post from "../../models/Post";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const { id } = req.query; // Extract id from query params

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Category ID is required",
      });
    }

    console.log('categoryid', id)

    try {
      // Fetch category by ID
      const category = await Category.findById(id);
      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }

      // Use the category name to fetch posts
      const posts = await Post.find({ category: category.category_name }).sort({ post_date: -1 });

      if (posts.length === 0) {
        return res.status(404).json({
          success: false,
          message: `No posts found for category "${category.category_name}"`,
        });
      }

      return res.status(200).json({
        success: true,
        category: category.category_name,
        posts,
      });
    } catch (error) {
      console.error("Error fetching posts by category ID:", error.message);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  } else {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }
};

export default connectDB(handler);
