import connectDB from "../middleware/mongoose";
import User from "../../models/User"; // Ensure correct model import
import mongoose from "mongoose"; // For ObjectId validation

const handler = async (req, res) => {
  try {
    // Extract _id from query
    const { _id } = req.query;

    // Validate _id
    if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ success: false, message: "Invalid user ID" });
    }

    // Fetch user by _id
    const user = await User.findById(_id);

    // If user not found
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Respond with success and user data
    res.status(200).json({ success: true, username: user.username });
  } catch (error) {
    // Handle server error
    console.error("Error fetching user:", error.message);
    res.status(500).json({ success: false, message: "Error fetching user" });
  }
};

export default connectDB(handler);
