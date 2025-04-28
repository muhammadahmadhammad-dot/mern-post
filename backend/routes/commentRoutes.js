import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { addComment, deleteComment } from "../controllers/commentController.js";

const commentRouter = express.Router()

commentRouter.post('/add/:id',authMiddleware,addComment);
commentRouter.delete('/delete/:id',authMiddleware, deleteComment);

export default commentRouter