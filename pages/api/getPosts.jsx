import connectDB from "../middleware/mongoose";
import Post from "../../models/Post";

const handler = async (req, res) => {
  try {
    // Use aggregation to join the users collection with posts
    const posts = await Post.aggregate([
      {
        $lookup: {
          from: "users", // The name of the collection to join (matches the 'users' collection in MongoDB)
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
