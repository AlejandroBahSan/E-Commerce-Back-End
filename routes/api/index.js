const router = require("express").Router();
const categoryRoutes = require("./category-routes");
const productRoutes = require("./product-routes");
const tagRoutes = require("./tag-routes");

// Setup routes for categories, products, and tags
router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);
router.use("/tags", tagRoutes);

module.exports = router; // Export the API router
