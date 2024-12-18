import connectDB from "../middleware/mongoose";
import Category from "../../models/Category";
import Post from "../../models/Post";

const handler = async (req, res) => {
  if (req.method === "DELETE") {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ success: false, message: "Category ID is required" });
    }

    try {
      // Find the category to ensure it exists
      const category = await Category.findById(id);
      if (!category) {
        return res.status(404).json({ success: false, message: "Category not found" });
      }

      // Optionally, handle posts associated with the category
      const relatedPosts = await Post.find({ category: category.category_name });

      if (relatedPosts.length > 0) {
        // Option 1: Delete related posts
        // await Post.deleteMany({ category: category.category_name });

        // Option 2: Mark related posts as uncategorized
        await Post.updateMany(
          { category: category.category_name },
          { category: "Uncategorized" } // Replace with a default value or null
        );
      }

      // Delete the category
      await Category.findByIdAndDelete(id);

      return res.status(200).json({ success: true, message: "Category deleted successfully" });
    } catch (error) {
      console.error("Error deleting category:", error.message);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  } else {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }
};

export default connectDB(handler);
