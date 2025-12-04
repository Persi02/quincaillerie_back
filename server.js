import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.routes.js";
import messageRoutes from "./routes/message.routes.js";

const app = express();
const PORT = process.env.PORT || 4400;
app.use(express.json());

// Middleware
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
  })
);

// Servir les images
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/products", productRoutes);
app.use("/api/messages", messageRoutes);

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
