import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { addComment, deleteComment,index } from "../controllers/commentController.js";

const commentRouter = express.Router()

commentRouter.get('/:postId',index);
commentRouter.post('/add',authMiddleware,addComment);
commentRouter.delete('/delete/:id',authMiddleware, deleteComment);

export default commentRouter