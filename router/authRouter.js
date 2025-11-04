import express from "express";
import * as authController from "../controller/authController.js";

const router = express.Router();

router.get("/signUp", authController.getSignUp);
router.post('/sign-up', authController.register)

export default router;
