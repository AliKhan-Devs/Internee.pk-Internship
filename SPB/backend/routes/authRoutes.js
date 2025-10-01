import Router from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/authControllers.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get('/me',protect, (req, res) => res.status(200).json(req.user));
router.post('/logout',protect, logoutUser);

export default router;