import connectDB from "../../middleware/mongoose";
import Post from "../../../models/Post";
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

    case "PUT":
      const form = new IncomingForm({
        uploadDir: path.join(process.cwd(), "/public/uploads"),
        keepExtensions: true,
      });

      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error("Error parsing form:", err);
          return res.status(500).json({ success: false, message: "Form parsing error" });
        }

        const { title, description, category } = fields;
        const post_img = files.post_img ? `/uploads/${files.post_img.newFilename}` : null;

        try {
          const post = await Post.findById(id);
          if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
          }

          // Delete old image if it exists and a new image is uploaded
          if (post_img && post.post_img) {
            const oldImagePath = path.join(process.cwd(), "public", post.post_img);
            fs.unlink(oldImagePath, (err) => {
              if (err) console.error("Error deleting old image:", err);
            });
          }

          const updatedPost = await Post.findByIdAndUpdate(
            id,
            { title, description, category, post_img: post_img || post.post_img },
            { new: true }
          );

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
        if (post.post_img) {
          const imagePath = path.join(process.cwd(), "public", post.post_img);
          fs.unlink(imagePath, (err) => {
            if (err) console.error("Error deleting image:", err);
          });
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
