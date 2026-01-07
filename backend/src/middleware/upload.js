// import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
/**
 * uploadImage is a factory function that returns a multer instance
 * @param {string} folderName - Name of the folder in Cloudinary
 */
export const uploadImage = (folderName = "uploads") => {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: folderName,
      allowedFormats: ["jpg", "png", "jpeg"],
    },
  });
  return multer({ storage });
};

import multer from "multer";

const upload = multer({ dest: "uploads/" });

export const aboutUpload = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "resume", maxCount: 1 },
]);

export const serviceUpload = upload.fields([{ name: "image", maxCount: 1 }]);

export const projectUpload = upload.fields([
  { name: "coverImage", maxCount: 1 },
  { name: "images", maxCount: 10 },
]);
