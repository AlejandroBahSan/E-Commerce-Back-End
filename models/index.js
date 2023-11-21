// Import models
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

// Define model relationships

// Product belongs to Category
Product.belongsTo(Category, {
  foreignKey: "category_id", // Define foreign key in Product model
});

// Category has many Products
Category.hasMany(Product, {
  foreignKey: "category_id", // Define foreign key in Product model
});

// Product belongs to many Tags (through ProductTag)
Product.belongsToMany(Tag, { through: ProductTag });

// Tag belongs to many Products (through ProductTag)
Tag.belongsToMany(Product, { through: ProductTag });

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
