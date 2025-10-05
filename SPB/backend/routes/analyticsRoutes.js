import { Router } from "express";
import { getAnalytics, increaseViews } from "../controllers/analyticsControllers.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = Router();

// Admin (protected) route
router.get("/views/:id", protect, getAnalytics);

// Public route — increases views on portfolio visit
router.put("/increase-views/:id", increaseViews);

export default router;
