import {  createTaskForInternship, deleteTask, getTaskByInternShip, getTasksDetailsByApplication, getUserTask, updateTask } from "../Controllers/taskControllers.js";
import { Router } from "express";
import { allowedRoles, protect } from "../lib/middlewares/authMiddleware.js";

const router = new Router();

router.get('/by-internship/:id',protect,allowedRoles(['admin','internee']),getTaskByInternShip);

router.get('/my-tasks',protect,allowedRoles(['internee']),getUserTask);
router.get('/get-tasks/application/:id',protect,allowedRoles(['admin','internee']),getTasksDetailsByApplication);
router.post('/create-task/:id',protect,allowedRoles(['admin']),createTaskForInternship);
router.put('/update-task/:id',protect,allowedRoles(['admin']),updateTask);
router.delete('/delete-task/:id',protect,allowedRoles(['admin']),deleteTask);

export default router;