import connectDB from "../middleware/mongoose";
import Post from "../../models/Post";
import mongoose from "mongoose";

const handler = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const userRole = req.headers.role; // Role sent in headers
    const userId = req.headers["user-id"]; // User ID sent in headers

    if (!userRole || !userId) {
      return res.status(400).json({ success: false, message: "Missing user role or ID" });
    }

    let matchCondition = {};

    // Filter posts based on user role
    if (userRole === "0") {
      matchCondition = { author: new mongoose.Types.ObjectId(userId) }; // Match posts by user ID
    }

    const pipeline = [
      { $match: matchCondition }, // Apply the match condition
      {
        $lookup: {
          from: "users", // Join with users collection
          localField: "author", // Field in posts collection
          foreignField: "_id", // Field in users collection
          as: "authorDetails", // Output array
        },
      },
      { $unwind: "$authorDetails" }, // Unwind the joined array
      {
        $project: {
          title: 1,
          description: 1,
          category: 1,
          post_date: 1,
          author: 1,
          post_img: 1,
          "authorDetails.username": 1, // Include only necessary fields
        },
      },
      { $sort: { post_date: -1 } }, // Sort by date (descending)
    ];

    const posts = await Post.aggregate(pipeline);

    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    res.status(500).json({ success: false, message: "Error fetching posts" });
  }
};

export default connectDB(handler);
