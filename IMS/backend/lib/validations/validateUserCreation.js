import { body, validationResult } from 'express-validator'
import User from '../../Models/User.js'

export const userValidation = [
    body('email')
        .isEmail().withMessage("Please Provide a valid Email")
        .normalizeEmail()
        .custom(async (value) => {
            const user = await User.findOne({ email: value });
            if (user) {
                throw new Error("A user with this email already exist")
            }
        }),

    body('password')
        .isLength({ min: 5 }).withMessage('Password must be atleast 5 character'),
    body('role').equals('internee').withMessage("Invaild role passed")
    
]

