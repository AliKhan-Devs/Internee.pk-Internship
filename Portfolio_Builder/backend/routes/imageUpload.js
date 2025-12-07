import multer from "multer";
import { protect } from "../middlewares/authMiddleware.js";

import { Router } from "express";
import { uploadImg } from "../controllers/cloudinaryControllers.js";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.post("/", protect, upload.single("file"), uploadImg);

export default router;
