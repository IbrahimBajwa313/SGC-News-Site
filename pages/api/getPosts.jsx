import connectDB from "../middleware/mongoose";
import Post from '../../models/Post'; // Adjust this import if necessary

export default async function handler(req, res) {
  await connectDB(); // Connect to the database

  try {
    const posts = await Post.find({}).sort({ post_date: -1 }); // Fetch posts and sort by postDate
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ success: false, message: 'Error fetching posts' });
  }
}
