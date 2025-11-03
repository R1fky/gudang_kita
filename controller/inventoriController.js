import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const addBarang = async (req, res) => {
  try {
    const { nama, stok, satuan, harga, kategori_id } = req.body;

    const existingBarang = await prisma.barang.findFirst({
      where: {
        nama: nama,
        kategoriId: Number(kategori_id),
      },
    });

    if (existingBarang) {
      return res.json({
        message: "Barang Serupa sudah Ada",
      });
    }

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
      data: response,
    });
  } catch (error) {
    return res.json({
      message: "Error:" + error,
    });
  }
};

export const deleteBarang = async (req, res) => {
  try {
    const barangId = Number(req.params.id);

    if (!barangId)
      return res.json({
        message: `barang ${barangId} tidak diteumakn`,
      });

    await prisma.barang.delete({
      where: { id: Number(barangId) },
    });

    return res.json({
      message: "Barang Berhasil di Hapus",
    });
  } catch (error) {
    return res.json({
      message: "Barang Gagal di Hapus" + error,
    });
  }
};

export const updateBarang = async (req, res) => {
  try {
    const barangId = Number(req.params.id);
    console.log(barangId);
    const { nama, stok, satuan, harga, kategori_id } = req.body;

    const existingBarang = await prisma.barang.findUnique({
      where: { id: Number(barangId) },
    });

    if (!existingBarang) {
      return res.status(404).json({
        message: `Barang dengan nama "${nama}" tidak ditemukan`,
      });
    }
    const updateBarang = await prisma.barang.update({
      where: { id: Number(barangId) },
      data: {
        ...(nama && { nama }),
        ...(stok && { stok: Number(stok) }),
        ...(satuan && { satuan }),
        ...(harga && { harga: Number(harga) }),
        ...(kategori_id && { kategoriId: Number(kategori_id) }),
      },
    });

    return res.json({
      message: "Data Berhasil di Update",
      data: updateBarang,
    });
  } catch (error) {
    return res.json({ message: "Barang Tidak Berhail di Update" + error });
  }
};
