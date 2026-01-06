import fs from "fs";
import FormData from "form-data";
import fetch from "node-fetch";

export async function uploadToAppwrite(file) {
  if (!file || !file.path) throw new Error("File payload invalid");

  const form = new FormData();
  const fileStream = fs.createReadStream(file.path);

  form.append("file", fileStream, {
    filename: file.originalname,
    knownLength: fs.statSync(file.path).size, // ensure correct Content-Length
  });

  const res = await fetch(
    `${process.env.APPWRITE_ENDPOINT}/storage/buckets/${process.env.APPWRITE_BUCKET_ID}/files`,
    {
      method: "POST",
      headers: {
        "X-Appwrite-Project": process.env.APPWRITE_PROJECT_ID,
        "X-Appwrite-Key": process.env.APPWRITE_API_KEY,
      },
      body: form,
    }
  );

  const data = await res.json();

  if (!res.ok) {
    console.error("Appwrite Upload Error:", data);
    throw new Error(`Upload failed: ${data.message}`);
  }

  fs.unlinkSync(file.path);

  return `${process.env.APPWRITE_ENDPOINT}/storage/buckets/${process.env.APPWRITE_BUCKET_ID}/files/${data.$id}/view?project=${process.env.APPWRITE_PROJECT_ID}`;
}
