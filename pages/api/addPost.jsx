import connectDB from "../middleware/mongoose";
import Post from "../../models/Post"; // Correct model import

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      // Extracting data from the request body
      const { title, description, category, postDate, author, imageName } = req.body;

      // Validate required fields
      if (!title || !description || !category || !postDate || !author || !imageName) {
        return res
          .status(400)
          .json({ success: false, message: "All fields are required" });
      }

      // Create a new post document
      const newPost = new Post({
        title,
        description,
        category,
        post_date: postDate, // Renamed to match 'postDate' from the client
        author,
        post_img: imageName, // Save only the image name here
      });

      // Save the post document to the database
      await newPost.save();

      res.status(201).json({ success: true, message: "Post added successfully" });
    } catch (error) {
      console.error("Error adding post:", error.message);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
};

export default connectDB(handler);
