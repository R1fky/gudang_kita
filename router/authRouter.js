import express from "express";
import * as authController from "../controller/authController.js";
import passport from "passport";

const router = express.Router();

//login
router.get("/get-login", (req, res) => {
  res.render("utils/loginPage", {
    title: "Login",
    page: "login",
    layout: "layouts/loginLay",
  });
});

//login google
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/auth/get-login" }), (req, res) => {
  res.redirect("/inventory");
});

// logout
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return next(err);

    req.session.destroy((err) => {
      if (err) {
        console.error("Gagal Mengapus Session :", err);
      }

      res.clearCookie("connect.sid"), //hapus cookie dari browser,
        res.redirect("/auth/get-login");
    });
  });
});

router.get("/signUp", authController.getSignUp);
router.post("/sign-up", authController.register);

export default router;
