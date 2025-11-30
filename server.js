import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.routes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4400;

//middleware
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use("/uploads", express.static("uploads"));
app.use(express.json());

app.use("/api/products", productRoutes);

//connexion DB
connectDB();

app.get("/", (req, res) => {
  res.send("cette api est en marche");
});

app.listen(PORT, () => {
  console.log(`server démarré sur port ${PORT}`);
});
