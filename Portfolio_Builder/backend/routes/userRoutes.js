import Router from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {getAllUsers} from "../controllers/usersControllers.js"

const router = Router();

router.get('/all-users',getAllUsers);

export default router;