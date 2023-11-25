const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");
const authenticate = require("../user-login/middleware/authenticate");
const isAdmin = require("../user-login/middleware/isAdmin");

// The `/api/products` endpoint

// Get all products including associated Category and Tag data
router.get("/", async (req, res) => {
  try {
    const dbProducts = await Product.findAll({
      include: [Category, Tag],
    });
    res.status(200).json(dbProducts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/admin/featured/:id", [authenticate, isAdmin], async (req, res) => {
  try {
    const updatedProduct = await Product.update(
      { featured: true }, // featured is a boolean attribute in the Product model
      { where: { id: req.params.id } }
    );

    if (!updatedProduct) {
      throw new Error("Product not found or update failed");
    }

    res.json({ message: "Product successfully added to the featured list" });
  } catch (err) {
    res.status(400).json({ message: `Error: ${err.message}` });
  }
});

router.put(
  "/admin/remove-featured/:id",
  [authenticate, isAdmin],
  async (req, res) => {
    try {
      const updatedProduct = await Product.update(
        { featured: true }, // featured is a boolean attribute in the Product model
        { where: { id: req.params.id } }
      );

      if (!updatedProduct) {
        throw new Error("Product not found or update failed");
      }

      res.json({
        message: "The product was successfully removed from the featured list",
      });
    } catch (err) {
      res.status(400).json({ message: `Error: ${err.message}` });
    }
  }
);

// Get one product by its `id` including associated Category and Tag data
router.get("/:id", async (req, res) => {
  try {
    const dbProducts = await Product.findByPk(req.params.id, {
      include: [{ model: Product, model: Tag }],
    });
    return dbProducts
      ? res.status(200).json(dbProducts)
      : res.status(404).json({
          message: `No Product found with the following id ${dbProducts}`,
        });
  } catch (err) {
    res.status(400).json(err);
  }
});

// create new product
/* req.body should look like this...
  {
    product_name: "Basketball",
    price: 200.00,
    stock: 3,
    tagIds: [1, 2, 3, 4]
  }
*/

// Create a new product
router.post("/", (req, res) => {
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// Update product details
router.put("/:id", (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);

      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });

      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json({ message: `this is your error${err}` });
    });
});

// Delete one product by its `id`
router.delete("/:id", (req, res) => {
  Product.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbProducts) => {
      return dbProducts
        ? res
            .status(200)
            .json({ message: `Product Id ${req.params.id} destroyed` })
        : res.status(500).json({
            message: `No Product found with the following id ${req.params.id}`,
          });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
