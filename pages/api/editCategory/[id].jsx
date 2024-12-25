import connectDB from "../../middleware/mongoose";
import Category from "../../../models/Category";


const handler = async (req, res) => {
  if (req.method === "PUT") {
    const { id } = req.query;
    const { category_name } = req.body;

    if (!id || !category_name) {
      return res.status(400).json({
        success: false,
        message: "Category ID and name are required",
      });
    }

    try {
      const updatedCategory = await Category.findByIdAndUpdate(
        id,
        { category_name },
        { new: true, runValidators: true }
      );

      if (!updatedCategory) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Category updated successfully",
        data: updatedCategory,
      });
    } catch (error) {
      console.error("Error updating category:", error);
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
