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

export const createOrder = async (req, res) => {
  try {
    const data = req.body;

    const barang = await prisma.barang.findUnique({
      where: { id: data.barangId },
    });

    if (!barang) {
      res.json({ message: "Barang Tidak Di Temukan" });
    }
    const total = barang.harga * data.quantity;

    const order = await prisma.order.create({
      data: {
        orderId: `ORDER-${Date.now()}`,
        userId: req.user.id || "guest",
        totalAmount: total,
        status: "pending",
        items: {
          create: [
            {
              barangId: barang.id,
              quantity: data.quantity,
              price: barang.harga,
            },
          ],
        },
        include: { item: true },
      },
    });

    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.SERVER_KEY,
    });

    let parameter = {
      transaction_details: {
        order_id: barang.id,
        gross_amount: total,
      },
      item_details: [
        {
          name: barang.nama,
          quantity: data.quantity,
          price: total,
        },
      ],
    };

    const transaction = snap.createTransaction(parameter);
    res.json({
      message: "Berhasil",
      transaction,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Error : " + error,
    });
  }
};
