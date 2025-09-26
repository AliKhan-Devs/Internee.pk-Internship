import { applyForInternship, getAllApplications, getApplicationById, getApplicationByUser, updateApplication } from "../Controllers/applicationControllers.js";
import { protect,allowedRoles } from "../lib/middlewares/authMiddleware.js";
import express from 'express'
const router = express.Router();

router.get('/my-applications',protect,allowedRoles(['internee']),getApplicationByUser);

router.get('/all-applications',protect,allowedRoles(['admin']),getAllApplications);

router.get('/:id',protect,allowedRoles(['admin','internee']),getApplicationById);
router.post('/apply/:id',protect,allowedRoles(['internee']),applyForInternship);

router.put('/:id',protect,allowedRoles(['admin']),updateApplication);


export default router;
