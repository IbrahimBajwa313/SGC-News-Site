// models/Post.js
import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  postDate: { type: Date, default: Date.now },
  author: { type: String, required: true },
  postImg: { type: String }, // Store the file path or URL
});

const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);
export default Post;
