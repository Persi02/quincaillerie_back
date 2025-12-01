import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.routes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
  })
);

app.use(express.json());

// Servir les images
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/products", productRoutes);

// Connexion DB
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("API en marche 🚀");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server démarré sur port ${PORT}`);
});
