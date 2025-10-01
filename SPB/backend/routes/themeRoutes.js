import { Router } from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { createTheme } from "../controllers/themeControllers.js";
const router = new Router();

router.put('/update-theme/:id',protect,createTheme);



export default router;