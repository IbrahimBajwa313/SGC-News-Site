import connectDB from "../../middleware/mongoose";
import Post from "../../../models/Post";
import Category from "../../../models/Category";
import { IncomingForm } from "formidable"; // Correct import for formidable
import fs from "fs";
import path from "path";
import mongoose from "mongoose"; // Import mongoose for ObjectId handling

// Disable Next.js default body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  const { id } = req.query;

  switch (req.method) {
    case "GET":
      try {
        // Use aggregation to find the specific post and include author details
        const post = await Post.aggregate([
          {
            $match: { _id: new mongoose.Types.ObjectId(id) }, // Match the specific post by its ID
          },
          {
            $lookup: {
              from: "users", // Name of the users collection
              localField: "author", // Field in the posts collection
              foreignField: "_id", // Field in the users collection
              as: "authorDetails", // Output array containing author details
            },
          },
          {
            $unwind: "$authorDetails", // Convert the array into an object
          },
          {
            $project: {
              title: 1,
              description: 1,
              category: 1,
              post_date: 1,
              post_img: 1,
              "authorDetails.username": 1, // Include only the username from authorDetails
            },
          },
        ]);

        if (!post || post.length === 0) {
          return res.status(404).json({ success: false, message: "Post not found" });
        }

        res.status(200).json({ success: true, data: post[0] });
      } catch (error) {
        console.error("Error fetching post:", error.message);
        res.status(500).json({ success: false, message: "Error fetching post" });
      }
      break;

    // case "PUT":
    //   const form = new IncomingForm({
    //     uploadDir: path.join(process.cwd(), "/public/uploads"),
    //     keepExtensions: true,
    //   });

    //   form.parse(req, async (err, fields, files) => {
    //     if (err) {
    //       console.error("Error parsing form:", err);
    //       return res.status(500).json({ success: false, message: "Form parsing error" });
    //     }
      
    //     let { title, description, category } = fields;
      
    //     // Ensure title is a string
    //     if (Array.isArray(title)) {
    //       title = title[0];  // Use the first value if title is an array
    //     }
    //     if (Array.isArray(description)) {
    //       description = description[0];  // Use the first value if title is an array
    //     }
    //     if (Array.isArray(category)) {
    //       category = category[0];  // Use the first value if title is an array
    //     }
      
    //     const post_img = files.post_img ? `/uploads/${files.post_img.newFilename}` : null;
      
    //     try {
    //       const post = await Post.findById(id);
    //       if (!post) {
    //         return res.status(404).json({ success: false, message: "Post not found" });
    //       }
      
    //       // Delete old image if it exists and a new image is uploaded
    //       if (post_img && post.post_img) {
    //         const oldImagePath = path.join(process.cwd(), "public", post.post_img);
    //         fs.unlink(oldImagePath, (err) => {
    //           if (err) console.error("Error deleting old image:", err);
    //         });
    //       }
      
    //       console.log('title', title);  // Confirm title is a string
    //       console.log('description', description);
    //       console.log('category', category);
    //       console.log('post_img', post_img);
      
    //       const updatedPost = await Post.findByIdAndUpdate(
    //         id,
    //         { title, description, category, post_img: post_img || post.post_img },
    //         { new: true }
    //       );
      
    //       res.status(200).json({ success: true, data: updatedPost });
    //     } catch (error) {
    //       console.error("Error updating post:", error.message);
    //       res.status(500).json({ success: false, message: error.message });
    //     }
    //   });
      
    //   break;
    case "PUT":
    // Define the upload directory
    const uploadDir = path.join(process.cwd(), "public/uploads");
  
    // Ensure the upload directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
  
    // Set up formidable to handle the file upload
    const form = new IncomingForm({
      uploadDir,
      keepExtensions: true,
      maxFileSize: 100 * 1024 * 1024, // 100MB limit
      filename: (name, ext, part) => `${Date.now()}_${part.originalFilename}`, // Create a unique filename
    });
  
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Error parsing form:", err);
        return res.status(500).json({ success: false, message: "Form parsing error" });
      }
  
      // Extract fields and ensure they're not arrays
      let { title, description, category, images } = fields;
  
      if (Array.isArray(title)) title = title[0];
      if (Array.isArray(description)) description = description[0];
      if (Array.isArray(category)) category = category[0];
  
      // Process existing image paths (if provided)
      const existingImagePaths = Array.isArray(images) ? images : [images]; // Ensure images is an array
      // const newImagePaths = existingImagePaths.map((imagePath) => {
      //   const imageName = imagePath.split('/').pop(); // Extract the image filename
      //   return `${Date.now()}_${imageName}`; // Generate a new image name with timestamp
      // });
  
      // Process uploaded image files
      const uploadedImagePaths = [];
      if (files.post_img) {
        const postImages = Array.isArray(files.post_img) ? files.post_img : [files.post_img]; // Handle multiple files
        postImages.forEach((image) => {
          const newFilename = image.newFilename;
          uploadedImagePaths.push(`${newFilename}`); // Store the path with /uploads/
        });
      }

      console.log('existingImagePaths',existingImagePaths)
  
      // Combine both new and existing image paths
      const allImagePaths = [...existingImagePaths, ...uploadedImagePaths];
      const obj={
        title,
        description,
        category,
        post_img: allImagePaths.length > 0 ? allImagePaths : post.post_img, // Update image paths
      }
      console.log('obj', obj)
      try {
        // Fetch the post from the database
        const post = await Post.findById(req.query.id);
        if (!post) {
          return res.status(404).json({ success: false, message: "Post not found" });
        }
  
        // Update the post with the new images
        const updatedPost = await Post.findByIdAndUpdate(
          req.query.id, // Post ID from the query
          {
            title,
            description,
            category,
            post_img: allImagePaths.length > 0 ? allImagePaths : post.post_img, // Update image paths
          },
          { new: true }
        );
  
        // Send the success response with the updated post
        res.status(200).json({ success: true, data: updatedPost });
      } catch (error) {
        console.error("Error updating post:", error.message);
        res.status(500).json({ success: false, message: error.message });
      }
    });
    break;
  

    case "DELETE":
      try {
        const post = await Post.findById(id);
        if (!post) {
          return res.status(404).json({ success: false, message: "Post not found" });
        }

        // Delete the image if it exists
        // if (post.post_img) {
        //   const imagePath = path.join(process.cwd(), "public", post.post_img);
        //   fs.unlink(imagePath, (err) => {
        //     if (err) console.error("Error deleting image:", err);
        //   });
        // }
        // Decrement the `post` count in the corresponding category
      const { category } = post; // Assuming `category` contains the category name
      const updatedCategory = await Category.findOneAndUpdate(
        { category_name: category },
        { $inc: { post: -1 } }, // Decrement post count by 1
        { new: true } // Return the updated document
      );

      if (!updatedCategory) {
        console.warn(`Category with name "${category}" not found.`);
      }

        const deletedPost = await Post.findByIdAndDelete(id);
        res.status(200).json({ success: true, data: deletedPost });
      } catch (error) {
        console.error("Error deleting post:", error.message);
        res.status(500).json({ success: false, message: error.message });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
  }
};

export default connectDB(handler);
