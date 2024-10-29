import formidable from "formidable";
import fs from "fs";
import path from "path";

// Disable the default body parser for formidable to work
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  if (req.method === "POST") {
    const form = formidable({ multiples: false });

    // Parse the form data
    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "File upload failed",
          error: err.message,
        });
      }

      // Ensure that the uploaded file exists and has the required properties
      const uploadedFile = files.image;
      if (!uploadedFile || !uploadedFile.originalFilename) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded or filename is missing",
        });
      }

      // Define the new path for saving the uploaded file
      const oldPath = uploadedFile.filepath;
      const newPath = path.join(
        process.cwd(),
        "public",
        "uploads",
        uploadedFile.originalFilename
      );

      // Move the file to the desired directory
      fs.rename(oldPath, newPath, (err) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Error saving file",
            error: err.message,
          });
        }

        // Successfully handled the file upload
        return res.status(200).json({
          success: true,
          message: "Post created successfully",
          data: { ...fields, imageUrl: `/uploads/${uploadedFile.originalFilename}` },
        });
      });
    });
  } else {
    // Send a response for unsupported methods
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }
};
