const express = require("express");
const { Product } = require("../../models");
const authenticate = require("../user-login/middleware/authenticate");
const isAdmin = require("../user-login/middleware/isAdmin");

const router = express.Router();

// Admin-only route to mark a product as featured
router.put(
  "/feature-product/:id",
  [authenticate, isAdmin],
  async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await Product.findByPk(productId);

      if (!product) {
        return res.status(404).send("Product not found.");
      }

      product.featured = true;
      await product.save();

      res.json({
        message: "Product successfully marked as featured.",
        product,
      });
    } catch (error) {
      console.error("Error in admin route:", error);
      res.status(500).send("Server error.");
    }
  }
);

module.exports = router;
