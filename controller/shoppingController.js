import midtransClient from "midtrans-client";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getShoppPage = async (req, res) => {
  try {
    const dataBarang = await prisma.barang.findMany({
      include: {
        kategori: true,
      },
    });

    res.render("pages/shope", {
      title: "Shopping",
      page: "shopping",
      noHeader: true,
      dataBarang: dataBarang,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: `Error Message : ${error}`,
    });
  }
};

let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.SERVER_KEY,
});

export const createOrder = async (req, res) => {
  try {
    const { orderBarang } = req.body;
    const userId = req.user?.userId

    const detailBarang = await prisma.barang.findMany({
      where: { id: orderBarang },
    });

    
  } catch (error) {
    console.log("Error Message disini :" + error);
    res.json({
      message: `Error Message : ${error}`,
    });
  }
};
