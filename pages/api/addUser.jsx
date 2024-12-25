import connectDB from "../middleware/mongoose";
import User from "../../models/User";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      // Parse the form data (assuming it's sent as `FormData`)
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

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Handle file upload (optional profile picture)
      let profilePicPath = "/uploads/default-pic.jpg"; // Default picture
      if (req.files && req.files.post_img) {
        const file = req.files.post_img; // Assuming `profile_pic` is the field name
        const uploadDir = path.join(process.cwd(), "public/uploads");

        // Create the upload directory if it doesn't exist
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        const filePath = path.join(
          uploadDir,
          `${Date.now()}-${file.name.replace(/\s+/g, "-")}`
        );
        profilePicPath = `/uploads/${path.basename(filePath)}`;

        // Save the file to the server
        fs.writeFileSync(filePath, file.data);
      }

      // Create a new user document
      const newUser = new User({
        first_name,
        last_name,
        username,
        password: hashedPassword,
        role,
        pic: profilePicPath,
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
