import cloudinary from "../configurations/cloudinray.js";

export async function uploadImage(filePath) {
  try {
    return await cloudinary.uploader.upload(filePath, {
      folder: "portfolio_uploads",
    });
  } catch (err) {
    throw new Error("Image upload failed: " + err.message);
  }
}
