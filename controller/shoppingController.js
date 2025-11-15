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
      noHeader: false,
      dataBarang: dataBarang,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: `Error Message : ${error}`,
    });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { barangId, quantity, userId } = req.body;
    console.log({ barangId, quantity, userId });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Error : " + error,
    });
  }
};
