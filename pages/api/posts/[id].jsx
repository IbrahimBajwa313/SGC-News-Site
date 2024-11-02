import connectDB from "../../middleware/mongoose"; 
import Post from "../../../models/Post";

const handler = async (req, res) => {
  const { id } = req.query;

  switch (req.method) {
    case "GET":
      try {
        const post = await Post.findById(id);
        if (!post) {
          return res.status(404).json({ success: false, message: "Post not found" });
        }
        res.status(200).json({ success: true, data: post });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;

    case "PUT":
      const { title, description, category, post_img } = req.body;
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          id,
          { title, description, category, post_img },
          { new: true }
        );
        if (!updatedPost) {
          return res.status(404).json({ success: false, message: "Post not found" });
        }
        res.status(200).json({ success: true, data: updatedPost });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;

    case "DELETE":
      try {
        if (!id) {
          return res.status(400).json({ success: false, message: "Post ID is required" });
        }

        const deletedPost = await Post.findByIdAndDelete(id);
        if (!deletedPost) {
          return res.status(404).json({ success: false, message: "Post not found" });
        }

        return res.status(200).json({ success: true, data: deletedPost });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      return res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
  }
};

export default connectDB(handler);
