import express from 'express'
import { createInternship,deleteInernship,getAllInternships, getInternshipById, updateInternship } from '../Controllers/internshipsController.js'
import {protect,allowedRoles} from '../lib/middlewares/authMiddleware.js'

const router = express.Router();

router.get('/all-internships',getAllInternships);
router.get('/internship-by-id/:id',getInternshipById);

router.post('/create-internship',protect,allowedRoles(['admin']),createInternship);
router.put('/update-internship/:id',protect,allowedRoles(['admin']),updateInternship);
router.delete('/delte-internship/:id',protect,allowedRoles(['admin']),deleteInernship);

export default router