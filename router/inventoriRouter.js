import express from "express";
import * as inventoriController from '../controller/inventoriController.js'

const router = express.Router();

router.get("/", (req, res) => {
  res.render("pages/inventori", {
    title: "Inventory",
    page: "inventory",
  });
});

router.post('/add-barang', inventoriController.addBarang)


export default router;
