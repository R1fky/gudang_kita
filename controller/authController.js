import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

export const getSignUp = (req, res) => {
  res.render("auth/register", {
    title: "Register",
    page: "",
  });
};

export const register = async (req, res) => {
  try {
    const { nama, username, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return res.json({
        message: "Gagal Mendafatr Akun ini Sudah di Buat",
      });
    }

    //hashpassword
    const saltRound = 10;
    const passwordHash = await bcrypt.hash(password, saltRound);

    const user = await prisma.user.create({
      data: {
        nama: nama,
        username: username,
        password: passwordHash,
        role: "VIEWER",
      },
    });

    return res.json({
      message: "Register Berhasil",
      data: user,
    });
  } catch (error) {
    return res.json({
      message: "Register Gagal" + error,
    });
  }
};
