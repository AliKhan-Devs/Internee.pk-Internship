import { getAllSubmissions, getSubmissionByInternship, getSubmissionByTask, getSubmissionByTaskAndUser, submitTask, updateSubmission } from "../Controllers/submissionControllers.js";
import { Router } from "express";
import { allowedRoles, protect } from "../lib/middlewares/authMiddleware.js";

const router = new Router();

router.post('/create-submission/task/:id',protect, allowedRoles(['internee']),submitTask);
router.get('/get-submission/task/:id',protect,allowedRoles(['internee']),getSubmissionByTask);
router.get('/get-submission/task/:taskId/user/:userId',protect,allowedRoles(['admin','internee']),getSubmissionByTaskAndUser);

router.put('/update-submission/:id',protect,allowedRoles(['admin']),updateSubmission);

router.get('/get-all-submissions',protect,allowedRoles(['admin']),getAllSubmissions);
router.get('/get-submission/internship/:id',protect,allowedRoles(['admin']),getSubmissionByInternship);


export default router;