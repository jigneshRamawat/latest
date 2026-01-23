import express from "express";
const router = express.Router();
import authController from "../controller/auth.controller.js";

router.post('/user/register',authController.registerUser)
router.post('/user/login',authController.loginUser)
router.get('/user/logout',authController.logoutUser)

export default router;