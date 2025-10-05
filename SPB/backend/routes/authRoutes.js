import Router from "express";
import { registerUser, loginUser, logoutUser, getUserById } from "../controllers/authControllers.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/me",protect, getUserById);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post('/logout',protect, logoutUser);

export default router;