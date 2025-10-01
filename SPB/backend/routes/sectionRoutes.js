import { Router } from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { updateProfile } from "../controllers/components_controllers/profilecControllers.js";
import { updateOverview } from "../controllers/components_controllers/overviewControllers.js";
const router = new Router();

router.put('/profile/:id',protect,updateProfile);
router.put('/overview/:id',protect,updateOverview);


export default router;