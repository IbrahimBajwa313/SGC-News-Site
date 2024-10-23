import mongoose from "mongoose";

// Middleware for connecting to the database
const connectDB = handler => async (req, res) => {
  // Check if already connected
  if (mongoose.connections[0].readyState) {
    return handler(req, res);
  }
  
  // Connect to the database
  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
  return handler(req, res);
};

export default connectDB;
