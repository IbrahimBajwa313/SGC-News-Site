import fs from "fs";
import path from "path";
import formidable from "formidable";
import connectDB from "../middleware/mongoose";
import Post from "../../models/Post";

export const config = {
  api: {
    bodyParser: false, // Disable Next.js default body parsing
  },
};

const handler = async (req, res) => {
  if (req.method === "POST") {
    const uploadDir = path.join(process.cwd(), "public/uploads");

    // Ensure the upload directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const form = formidable({
      uploadDir,
      keepExtensions: true,
      maxFileSize: 5 * 1024 * 1024, // 5MB limit for image upload
      filename: (name, ext, part) => `${Date.now()}_${part.originalFilename}`,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Error parsing form data:", err);
        return res.status(500).json({ success: false, message: "Error parsing form data" });
      }

      // Ensure we get strings instead of arrays
      const title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
      const description = Array.isArray(fields.description) ? fields.description[0] : fields.description;
      const category = Array.isArray(fields.category) ? fields.category[0] : fields.category;
      const postDate = fields.postDate; // Assuming postDate is correctly sent as a string
      const author = fields.author; // Assuming author is correctly sent as a string
      const imageFile = files.image?.[0] || files.image; // Handles single or array of files

      if (!title || !description || !category || !postDate || !author || !imageFile) {
        return res.status(400).json({ success: false, message: "All fields are required" });
      }

      // Extract the image name
      const imageName = path.basename(imageFile.filepath);

      try {
        const newPost = new Post({
          title,
          description,
          category,
          post_date: postDate,
          author,
          post_img: imageName,
        });

        await newPost.save();

        res.status(201).json({ success: true, message: "Post added successfully" });
      } catch (error) {
        console.error("Error adding post:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
      }
    });
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
};

export default connectDB(handler);
