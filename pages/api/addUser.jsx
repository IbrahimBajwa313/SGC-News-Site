import connectDB from "../middleware/mongoose";
import User from "../../models/User"; // Correct model import
import bcrypt from "bcrypt"; // To hash the password

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      // Extracting data from the request body
      const { first_name, last_name, username, password, role } = req.body;

      // Validate required fields
      if (!first_name || !last_name || !username || !password || !role) {
        return res
          .status(400)
          .json({ success: false, message: "All fields are required" });
      }

      // Check if a user with the same username already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res
          .status(400)
          .json({ success: false, message: "Username already taken" });
      }

      console.log('unhashed password', password)
      // Hash the password before saving the user
      const hashedPassword = await bcrypt.hash(password, 10);

      console.log('hashed password', hashedPassword)

      // Create a new user document
      const newUser = new User({
        first_name,
        last_name,
        username,
        password: hashedPassword,
        role,
      });

      // Save the user document to the database
      await newUser.save();

      res.status(201).json({ success: true, message: "User added successfully" });
    } catch (error) {
      console.error("Error adding user:", error.message);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
};

export default connectDB(handler);
