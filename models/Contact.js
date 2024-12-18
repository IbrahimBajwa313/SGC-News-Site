import mongoose from 'mongoose';

// Define the Contact schema
const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  userId: {
    type: String, // Store the userId as a string (could also be ObjectId if you reference a user model)
    default: null, // Default to null if user is not logged in
  },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Create and export the Contact model
const Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
export default Contact;
