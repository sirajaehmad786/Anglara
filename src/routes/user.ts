import express from "express";
const router = express.Router();
import { adminLogin } from "../controller/user";


router.post('/login', adminLogin)

export default router;
