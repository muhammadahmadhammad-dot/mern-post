import express from "express";
import { deletePost, index, show, store, update } from "../controllers/postController.js";

const router = express.Router()

router.get('/',index);
router.get('/show/:id',show);
router.post('/create',store);
router.put('/update/:id',update);
router.delete('/delete/:id', deletePost);

export default router