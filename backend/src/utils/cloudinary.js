import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from 'dotenv'
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadOnCloudnary = async (localFilePath) => {
  console.log(localFilePath)
  try {
    if (!localFilePath) {
      console.log("File path not found");
      return null;
    }
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_types: "auto",
    });

    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};

export {uploadOnCloudnary}