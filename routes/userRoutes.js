import express from "express";
import { register, authenticate, confirm, forgotPassword, validateToken, newPassword, profile } from "../controllers/userController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

//Authentication, Register and User Confirmation
router.post('/', register) // Create a new User
router.post('/login', authenticate)
router.get('/confirm/:token', confirm)
router.post('/forgot-password', forgotPassword)
router.route('/forgot-password/:token').get(validateToken).post(newPassword)

router.get('/profile', checkAuth, profile);

export default router