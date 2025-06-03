import express from "express";
import dotenv from "dotenv";
import DBconnection from "./database/db_connection.js";
import cors from "cors";
import bodyparser from "body-parser";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import productsRouth from "./routes/productsRouth.js";
import customersRoute from "./routes/customersRoutes.js";
import billRoutes from "./routes/billRoutes.js";
import returnDueRoutes from "./routes/returnDueRoutes.js";
import ExpensesRoutes from "./routes/ExpensesRoutes.js";

const app = express();
dotenv.config();
DBconnection();
const port = process.env.POR || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    credentials: true,
  })
);

app.options(
  "*",
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cookieParser());

app.listen(port, () => {
  console.log("server is running!");
});

app.use("/uploads", express.static("uploads"));

app.use(authRoutes);
app.use("/api/products", productsRouth);
app.use("/api/customers", customersRoute);
app.use("/api/bills", billRoutes);
app.use("/api/duecustomers", returnDueRoutes);
app.use("/api/expenses", ExpensesRoutes);
