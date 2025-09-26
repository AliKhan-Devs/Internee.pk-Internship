import { createUser,getAllUsers, loginUser,getUserById, updateUser } from "../Controllers/userControllers.js";
import express from "express";
import { userValidation } from "../lib/validations/validateUserCreation.js";
import { validate } from "../lib/validations/index.js";
import { allowedRoles, protect } from "../lib/middlewares/authMiddleware.js";
import adminValidation from "../lib/validations/validateAdminCreation.js";
const router = express.Router();

// Get all users only by admin role
router.get('/all-users',protect,allowedRoles('admin'),getAllUsers);

// Get User by his id
router.get('/me',protect,allowedRoles(['admin','internee']),getUserById);

// Crate a new user
router.post('/create-user',userValidation,validate,createUser);

// Create a new admin for the site
router.post('/create-admin',adminValidation,validate,protect,allowedRoles('admin'),createUser);
router.put('/update-user/:id',protect,allowedRoles('admin'),updateUser);

// Login a user
router.post('/login',loginUser);

export default router;