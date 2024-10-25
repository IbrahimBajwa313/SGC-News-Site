import connectDB from "../middleware/mongoose";
import Post from '../../models/Post';

const handler = async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ post_date: -1 });
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    console.error('Error fetching posts:', error.message);
    res.status(500).json({ success: false, message: 'Error fetching posts' });
  }
};

export default connectDB(handler); // Wrap the handler with the connectDB middleware
