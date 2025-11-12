import express from "express";
import * as shoppingController from "../controller/shoppingController.js";
const router = express.Router();

router.get("/", shoppingController.getShoppPage);

//payment midtrans
router.post("/create-order", shoppingController.createOrder);

export default router;
