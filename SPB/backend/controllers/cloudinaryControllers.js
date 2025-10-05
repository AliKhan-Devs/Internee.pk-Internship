import { uploadImage } from "../utils/upload.js";

export const uploadImg = async (req, res) => {
  try {
    const file = req.file; // multer provides this
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const result = await uploadImage(file.path);

    return res.json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
