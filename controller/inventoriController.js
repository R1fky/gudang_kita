import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const addBarang = async (req, res) => {
  try {
    const { nama, stok, satuan, harga, kategori_id } = req.body;
    const response = await prisma.barang.create({
      data: {
        nama: nama,
        stok: Number(stok),
        satuan: satuan,
        harga: Number(harga),
        kategoriId: Number(kategori_id),
      },
    });
    return res.json({
      message: "Data berhasil Di Masukkan",
      response,
    });
  } catch (error) {
    return res.json({
      message: "Error:" + error,
    });
  }
};
