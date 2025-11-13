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
    const { barangId, quantity } = req.body;
    const barang = await prisma.barang.findUnique({
      where: { id: barangId },
    });
    if (!barang) {
      console.log("Barang Tidak di Temukan");
    }
    const totalAmount = barang.harga * quantity;
    const newOrder = await prisma.order.create({
      data: {
        orderId: `ORDER-${Date.now()}`,
        userId: 1,
        totalAmount: totalAmount,
        status: "pending",
        items: {
          create: [
            {
              barangId: barang.id,
              quantity: quantity,
              price: barang.harga,
            },
          ],
        },
      },
      include: {
        items: true,
      },
    });

    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.SERVER_KEY,
    });

    let parameter = {
      transaction_details: {
        order_id: newOrder.orderId,
        gross_amount: totalAmount,
      },
      items_details: [
        {
          id: barang.id,
          price: barang.harga,
          quantity: Number(quantity),
          name: barang.nama,
        },
      ],
      customer_details: {
        first_name: "Guest",
        email: "guest@example.com",
      },
    };

    const transaction = await snap.createTransaction(parameter);
    res.json({
      snapToken: transaction.token,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Error : " + error,
    });
  }
};
