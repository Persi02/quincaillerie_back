import mongoose from "mongoose";

const productShema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    category: { type: String, required: true },
    image: { type: String, required: true },
    isFeatured: { type: Boolean, default: false },
    description: { type: String, required: false },
    isPromotion: { type: Boolean, default: false },
    promotionPrice: { type: Number, required: false },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", productShema);
