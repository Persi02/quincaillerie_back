import Product from "../models/Product.js";

// Créer un produit
export const createProduct = async (req, res) => {
  try {
    const imagePath = req.file ? req.file.path : null;
    const product = await Product.create({ ...req.body, image: imagePath });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Récupérer tous les produits
export const getAllProduct = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const category = req.query.category || "";
    const search = req.query.search || "";
    const sort = req.query.sort || "desc"; // asc | desc

    // Build filters
    let filters = {};

    if (category && category !== "Tous") {
      filters.category = category; // exact category
    }

    if (search) {
      filters.name = { $regex: search, $options: "i" };
    }

    // Count total with filters
    const totalProducts = await Product.countDocuments(filters);

    // Pagination
    const limit = parseInt(req.query.limit) || totalProducts;
    const skip = (page - 1) * limit;

    // Sorting
    const sortOption = { createdAt: sort === "asc" ? 1 : -1 };

    // Query products
    const products = await Product.find(filters)
      .skip(skip)
      .limit(limit)
      .sort(sortOption);

    res.json({
      page,
      limit,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer un produit par id
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour un produit
export const updateProduct = async (req, res) => {
  try {
    const updatedData = { ...req.body };
    if (req.file) {
      updatedData.image = req.file.path;
    }
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supprimer un produit
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }
    res.json({ message: "Produit supprimé" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const featuredProducts = async (req, res) => {
  try {
    const products = await Product.find({
      isFeatured: true,
    })
      .sort({ updatedAt: -1 })
      .limit(4);
    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ message: "Aucun product en vedette trouvé" });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
export const promotedProducts = async (req, res) => {
  try {
    const products = await Product.find({
      isPromotion: true,
    });
    if (!products) {
      return res
        .status(404)
        .json({ message: "Aucun product en promotion rencontré" });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
export const latestProducts = async (req, res) => {
  try {
    const product = await Product.find().sort({ createdAt: -1 }).limit(4);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
