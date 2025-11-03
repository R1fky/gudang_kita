import express from "express";
import * as inventoriController from "../controller/inventoriController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("pages/inventori", {
    title: "Inventory",
    page: "inventory",
  });
});

router.post("/add-barang", inventoriController.addBarang);
router.delete("/delete-barang/:id", inventoriController.deleteBarang);
router.patch("/update-barang/:id", inventoriController.updateBarang);

export default router;
