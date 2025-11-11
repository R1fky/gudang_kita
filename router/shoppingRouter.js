import express from "express";
import * as shoppingController from "../controller/shoppingController.js";
const router = express.Router();

router.get("/", shoppingController.getShoppPage);

//payment midtrans
router.get('/payment', shoppingController.paymentClient)

export default router;
