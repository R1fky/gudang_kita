import express from "express";
import * as inventoriController from "../controller/inventoriController.js";

const router = express.Router();

router.get("/", inventoriController.getInventori)
// crud
router.post("/add-barang", inventoriController.addBarang);
router.delete("/delete-barang/:id", inventoriController.deleteBarang);
router.patch("/update-barang/:id", inventoriController.updateBarang);
// end crud

export default router;
