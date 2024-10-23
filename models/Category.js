const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  category_name: { type: String, required: true },
  post: { type: Number, default: 0 }
});

module.exports = mongoose.model('Category', categorySchema);
