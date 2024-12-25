const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the user schema
const userSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String },
  password: { type: String },
  role: { type: Number, required: true }
});

// Check if the User model already exists and export it, otherwise define it
module.exports = mongoose.models.User || mongoose.model('User', userSchema);
