import express from "express";
const router = express.Router();
import { addBlog,getAllPost,getByIdPost,deletePost,updateBlog } from "../controller/blog";
import {verifyAdminToken} from '../middleware/verifyAdminToken'

router.post('/add', verifyAdminToken,addBlog)
router.get('/list', getAllPost)
router.get('/listById/:id', getByIdPost)
router.put('/update/:id',verifyAdminToken, updateBlog)
router.delete('/delete/:id',verifyAdminToken, deletePost)

export default router;
