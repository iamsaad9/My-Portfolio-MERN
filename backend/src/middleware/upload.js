import multer from "multer";

const upload = multer({ dest: "uploads/" });

export const aboutUpload = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "resume", maxCount: 1 },
]);

export const serviceUpload = upload.fields([{ name: "image", maxCount: 1 }]);
export const testimonialUpload = upload.fields([
  { name: "image", maxCount: 1 },
]);

export const projectUpload = upload.fields([
  { name: "coverImage", maxCount: 1 },
  { name: "images", maxCount: 10 },
]);
