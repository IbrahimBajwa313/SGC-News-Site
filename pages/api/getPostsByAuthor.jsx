import mongoose from "mongoose";
import connectDB from "../middleware/mongoose";
import Post from "../../models/Post";

const handler = async (req, res) => {
  try {
    const { author } = req.query; // Extract the 'author' query parameter

    if (!author) {
      return res.status(400).json({ success: false, message: "Author ID is required." });
    }

    // Ensure the author ID is cast as an ObjectId
    const authorObjectId = new mongoose.Types.ObjectId(author);

    // Use aggregation to join the users collection with posts
    const posts = await Post.aggregate([
      {
        $match: { author: authorObjectId }, // Filter by the author ID
      },
      {
        $lookup: {
          from: "users", // The name of the collection to join
          localField: "author", // The field in the posts collection
          foreignField: "_id", // The field in the users collection
          as: "authorDetails", // The name of the output array
        },
      },
      {
        $unwind: "$authorDetails", // Unwind the array to include only one user per post
      },
      {
        $project: {
          title: 1,
          description: 1,
          category: 1,
          post_date: 1,
          author: 1,
          post_img: 1,
          "authorDetails.username": 1, // Include only the username from authorDetails
        },
      },
      {
        $sort: { post_date: -1 }, // Sort by post_date in descending order
      },
    ]);

    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    res.status(500).json({ success: false, message: "Error fetching posts" });
  }
};

export default connectDB(handler);
