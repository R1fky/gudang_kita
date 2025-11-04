import express from "express";
import expressEjsLayouts from "express-ejs-layouts";

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

// roting
import inventoriRouter from "./router/inventoriRouter.js";
import authRouter from "./router/authRouter.js";
// Routes
app.get("/", (req, res) => {
  res.render("pages/dashboard", {
    title: "Dashboard",
    page: "dashboard",
  });
});

app.use("/inventory", inventoriRouter);
app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
