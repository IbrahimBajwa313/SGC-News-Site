import connectDB from "../middleware/mongoose";
import Post from '../../models/User';

const handler = async (req, res) => {
  try {
    const posts = await User.find({});
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error('Error fetching posts:', error.message);
    res.status(500).json({ success: false, message: 'Error fetching posts' });
  }
};

export default connectDB(handler); // Wrap the handler with the connectDB middleware
