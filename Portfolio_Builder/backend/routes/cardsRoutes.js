import { Router } from "express";
import { createCard, deleteCard, getCardByPosition, updateCard } from "../controllers/components_controllers/cardControllers.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = new Router();

router.get('/position/:id',getCardByPosition);
router.post('/create',protect, createCard);
router.put('/update/:id',protect,updateCard);
router.delete('/delete/:id',protect,deleteCard);


export default router;