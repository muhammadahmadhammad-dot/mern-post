import express from "express";
import { deletePost, display, index, show, store, update } from "../controllers/postController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import fileHelper from "../helper/fileHelper.js";

const postRouter = express.Router()

postRouter.get('/',index);
postRouter.get('/:slug',display);
postRouter.get('/show/:id',authMiddleware,show);
postRouter.post('/create',store);
postRouter.put('/update/:id',authMiddleware,update);
postRouter.delete('/delete/:id',authMiddleware, deletePost);

export default postRouter