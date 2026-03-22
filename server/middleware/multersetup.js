import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { config } from "dotenv";

config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Memory mein rakh file — phir cloudinary pe bhejo
const storage = multer.memoryStorage();
export const upload = multer({ storage });

// Yeh function call karo controller mein
export const uploadToCloudinary = (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(

     { folder: folder || "skillbridge/profiles",
       resource_type: "raw",      // ✅ PDF ke liye raw chahiye
        format: "pdf",
        transformation: [{ width: 500, height: 500, crop: "fill" }]
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    ).end(fileBuffer);
  });
};