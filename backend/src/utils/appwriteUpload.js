import { Client, Storage, ID } from "node-appwrite";
import fs from "fs";

const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const storage = new Storage(client);
const BUCKET_ID = process.env.APPWRITE_BUCKET_ID;

export async function uploadToAppwrite(file) {
  // 1. Read the file into a buffer
  const fileBuffer = fs.readFileSync(file.path);

  // 2. Create a standard Web File object from the buffer
  // Syntax: new File([parts], fileName, { type: mimeType })
  const fileToUpload = new File([fileBuffer], file.originalname, {
    type: file.mimetype,
  });

  // 3. Pass the File object to Appwrite
  const uploaded = await storage.createFile(
    BUCKET_ID,
    ID.unique(),
    fileToUpload
  );

  // Delete local temp file
  fs.unlinkSync(file.path);

  return `${process.env.APPWRITE_ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${uploaded.$id}/view?project=${process.env.APPWRITE_PROJECT_ID}`;
}
