import Post from "../../models/Post";
import connectDB from "../middleware/mongoose";
import { IncomingForm } from "formidable"; 
import fs from "fs";
import path from "path";

// Connect to DB with middleware
export const config = {
  api: {
    bodyParser: false, // Disabling the default bodyParser
  },
};

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const form = new IncomingForm(); 
  form.uploadDir = path.join(process.cwd(), "/public/uploads");

  // Check if the upload directory exists
  if (!fs.existsSync(form.uploadDir)) {
    fs.mkdirSync(form.uploadDir, { recursive: true });
  }

  form.keepExtensions = true;
// Parse the incoming form
form.parse(req, async (err, fields, files) => {
  if (err) {
    console.error("Form parsing error:", err);
    return res.status(500).json({ success: false, message: "Form parsing failed" });
  }

  try {
    // Log the fields and files
    console.log("Fields received:", fields);
    console.log("Files received:", files);

    // Ensure that a file is uploaded
    if (!files.fileToUpload) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // Extract fields and ensure they're handled as strings
    const postTitle = fields.post_title && Array.isArray(fields.post_title) ? fields.post_title[0] : fields.post_title;
    const postDesc = fields.postdesc && Array.isArray(fields.postdesc) ? fields.postdesc[0] : fields.postdesc;
    const category = fields.category && Array.isArray(fields.category) ? fields.category[0] : fields.category;

    // Access the uploaded file
    const uploadedFile = files.fileToUpload[0]; // Assuming only one file is uploaded
    const fileName = uploadedFile.newFilename; // Use the new filename assigned by formidable

    // Move the file to the designated upload directory
    fs.renameSync(uploadedFile.filepath, path.join(form.uploadDir, fileName));

    // Create a new post with string values
    const newPost = new Post({
      title: postTitle, // Store as string
      description: postDesc,
      category: category,
      image: fileName // Assuming you want to store the file name in the post
    });

    // Save the post to the database
    await newPost.save();

    // Respond with success
    res.status(200).json({ success: true, message: "Post uploaded successfully", data: newPost });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ success: false, message: "Failed to create post" });
  }
});

};

export default connectDB(handler);
