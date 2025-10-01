import { Router } from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { createContact } from "../controllers/contactControllers.js";


const router = new Router();
router.put('/update-contact/:id',protect,createContact);


export default router;