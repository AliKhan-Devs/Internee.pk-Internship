import { deleteFeedback, getFeedbackBySubmission, submitFeedback, updateFeedback } from "../Controllers/feedbackControllers.js";
import { Router } from "express";
import { allowedRoles, protect } from "../lib/middlewares/authMiddleware.js";
const router = new Router();

router.post('/submit-feedback/:id',protect,allowedRoles(['admin']),submitFeedback);
router.put('/update-feedback/:id',protect,allowedRoles(['admin']),updateFeedback);
router.delete('/delete-feedback/:id',protect,allowedRoles(['admin']),deleteFeedback);
router.get('/get-feedback/submission/:id',protect,allowedRoles(['admin','internee']),getFeedbackBySubmission);


export default router;