const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  post_date: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  post_img: { type: String, required: true }
});

module.exports = mongoose.model('Post', postSchema);
