import express from "express";
import bodyParser from "body-parser";
import passport from "passport";
import { Strategy } from "passport-local";
import session from "express-session";
import env from "dotenv";

import db from "./routes/db.js";
import authRoutes from "./routes/auth.js";
import dashboardRoutes from "./routes/dashboard.js";
import manageProductsRoutes from "./routes/manageProducts.js";
import manageSuppliersRoutes from "./routes/manageSuppliers.js";

const app = express();
app.set("view engine", "ejs");
const port = 3000;
const saltRounds = 10;
env.config();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("home.ejs");
});

app.use("/", authRoutes);
app.use("/", dashboardRoutes);
app.use("/", manageProductsRoutes);
app.use("/", manageSuppliersRoutes);

app.listen(port, () => {
    console.log(`Server running is port ${port}`)
})
