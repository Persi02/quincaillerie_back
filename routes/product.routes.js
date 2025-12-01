import express from "express";

import {
  createProduct,
  getAllProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  featuredProducts,
  promotedProducts,
  latestProducts,
} from "../controllers/product.controller.js";
import { upload } from "../middleware/cloudinary.js";

const router = express.Router();
router.post("/", upload.single("image"), createProduct);
router.get("/", getAllProduct);
router.get("/featured", featuredProducts);
router.get("/promo", promotedProducts);
router.get("/latest", latestProducts);
router.get("/:id", getProduct);
router.put("/:id", upload.single("image"), updateProduct);
router.delete("/:id", deleteProduct);

export default router;
