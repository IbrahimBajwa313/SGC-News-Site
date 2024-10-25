// models/Post.js
import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  post_date: { type: Date, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' }, // if using references
  post_img: { type: String, required: true },
});

const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);

export default Post;
