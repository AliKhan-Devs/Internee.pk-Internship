import { Router } from "express";
import {protect} from "../middlewares/authMiddleware.js"
import { createButton, deleteButton, getButtonsByPosition, updateButton } from "../controllers/components_controllers/buttonControllers.js";
const router = new Router();

router.get('/position/:id',getButtonsByPosition);
router.post('/create-button',protect, createButton);
router.put('/update/:id',protect,updateButton);
router.delete('/delete/:id',protect,deleteButton);


export default router;