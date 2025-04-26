import express from "express";
import { login, logout, register } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router()

router.post('/register',register);
router.post('/login',authMiddleware,login);
router.post('/logout',authMiddleware,logout);

export default router