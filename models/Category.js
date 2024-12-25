const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  category_name: { type: String, required: true, unique: true  },
  post: { type: Number, default: 0 }
});

// Check if the model is already defined, to prevent overwriting
const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

module.exports = Category;
