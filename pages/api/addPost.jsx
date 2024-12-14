import fs from "fs";
import path from "path";
import formidable from "formidable";
import connectDB from "../middleware/mongoose";
import Post from "../../models/Post";

export const config = {
  api: {
    bodyParser: false, // Disable default body parsing
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
      maxFileSize: 100 * 1024 * 1024, // 5MB limit
      filename: (name, ext, part) => `${Date.now()}_${part.originalFilename}`,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Error parsing form data:", err);
        return res.status(500).json({ success: false, message: "Error parsing form data" });
      }

      const postImage = files.postImage?.[0]; 
      const newFilename = postImage.newFilename;


      

      const title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
      const description = Array.isArray(fields.description) ? fields.description[0] : fields.description;
      const category = Array.isArray(fields.category) ? fields.category[0] : fields.category;
      const author = Array.isArray(fields.author) ? fields.author[0] : fields.author;
      const postDate = new Date();
      const imageName = newFilename;
      // console.log('image', imageName)

      console.log('title',title)
      console.log('description',description)
      console.log('category',category)
      console.log('postDate',postDate)
      console.log('author',author)
      console.log('imageName', imageName)


      if (!title || !description || !category || !postDate || !author || !imageName) {
        return res.status(400).json({ success: false, message: "All fields are required" });
      }


      try {
        const newPost = new Post({
          title,
          description,
          category,
          post_date: postDate,
          author,
          post_img: imageName,
        });

        console.log(newPost, 'newPost')

        await newPost.save();
        return res.status(201).json({ success: true, message: "Post added successfully" });
      } catch (error) {
        console.error("Error saving post:", error.message);
        return res.status(500).json({ success: false, message: "Internal server error" });
      }
    });
  } else {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }
};

export default connectDB(handler);
