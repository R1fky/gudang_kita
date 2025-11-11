import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getInventori = async (req, res) => {
  try {
    const dataInventori = await prisma.barang.findMany({
      include: {
        kategori: true,
      },
    });
    const kategoriList = await prisma.kategori.findMany({
      select: { id: true, nama: true },
    });

    res.render("pages/inventori", {
      title: "Inventory",
      page: "inventory",
      noHeader: false,
      dataInventori: dataInventori,
      kategoriList: kategoriList,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Inventori tidak dapat dimuat" + error,
    });
  }
};

export const addBarang = async (req, res) => {
  try {
    const data = req.body;

    const existingBarang = await prisma.barang.findFirst({
      where: {
        nama: data.namaBarang,
        kategoriId: Number(data.kategoriBarang),
      },
    });

    if (existingBarang) {
      return res.json({
        message: "Barang Serupa sudah Ada",
      });
    }

    await prisma.barang.create({
      data: {
        nama: data.namaBarang,
        stok: Number(data.stokBarang),
        satuan: data.satuanBarang,
        harga: Number(data.hargaBarang),
        kategoriId: Number(data.kategoriBarang),
      },
    });

    return res.json({
      message: "Data berhasil Di Tambahkan",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Error:" + error,
      success: false,
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
