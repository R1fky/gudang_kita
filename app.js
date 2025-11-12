import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import dotenv from "dotenv";
import session from "express-session";
import passport from "./config/passport.js";

//config
dotenv.config();
const app = express();
const PORT = 3000;

// Setup EJS
app.set("view engine", "ejs");
// Setup EJS Layouts
app.use(expressEjsLayouts);
app.set("layout", "layouts/main");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static("public"));

// session
app.use(
  session({
    secret: process.env.SESSION_SECRET, // pakai secret dari .env
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 hari
    },
  })
);

// passport insialisasi
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// roting
import inventoriRouter from "./router/inventoriRouter.js";
import authRouter from "./router/authRouter.js";
import shoppingRouter from "./router/shoppingRouter.js";
("");
// Routes
app.get("/", (req, res) => {
  res.render("pages/dashboard", {
    title: "Dashboard",
    page: "dashboard",
    noHeader: false,
  });
});

app.use("/inventory", inventoriRouter);
app.use("/auth", authRouter);
app.use("/shopping", shoppingRouter);

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
