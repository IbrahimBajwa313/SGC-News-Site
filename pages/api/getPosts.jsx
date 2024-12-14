import connectDB from "../middleware/mongoose";
import Post from "../../models/Post";

const handler = async (req, res) => {
  try {
    const userRole = req.headers['role']; // Getting role from the headers
      const userId = req.headers['user-id'];
    console.log('role',userRole)
    console.log('userId',userId)

    // if (!userRole || !userId) {
    //   return res.status(400).json({ success: false, message: "Role and User ID are required" });
    // }
    // Use aggregation to join the users collection with posts
    // const posts = await Post.aggregate([
    //   {
    //     $lookup: {
    //       from: "users", // The name of the collection to join (matches the 'users' collection in MongoDB)
    //       localField: "author", // The field in the posts collection
    //       foreignField: "_id", // The field in the users collection
    //       as: "authorDetails", // The name of the output array
    //     },
    //   },
    //   {
    //     $unwind: "$authorDetails", // Unwind the array to include only one user per post
    //   },
    //   {
    //     $project: {
    //       title: 1,
    //       description: 1,
    //       category: 1,
    //       post_date: 1,
    //       author: 1,
    //       post_img: 1,
    //       "authorDetails.username": 1, // Include only the username from authorDetails
    //     },
    //   },
    //   {
    //     $sort: { post_date: -1 }, // Sort by post_date in descending order
    //   },
    // ]);

    const pipeline = [
      {
        $lookup: {
          from: "users", // Name of the collection to join
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
          "authorDetails.username": 1, // Include only username from authorDetails
        },
      },
      { $sort: { post_date: -1 } }, // Sort by post_date in descending order
    ];

    // Apply filters based on user role
    if (userRole === 0) {
      // Normal user: show only their own posts
      pipeline.unshift({
        $match: { author: userId },
      });
    }

    // Fetch the filtered posts
    const posts = await Post.aggregate(pipeline);

    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    res.status(500).json({ success: false, message: "Error fetching posts" });
  }
};

export default connectDB(handler);
