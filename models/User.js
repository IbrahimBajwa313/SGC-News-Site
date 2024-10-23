const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String },
  password: { type: String },
  role: { type: Number, required: true }
});

module.exports = mongoose.model('User', userSchema);
