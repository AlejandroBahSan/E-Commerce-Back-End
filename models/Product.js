// Import Sequelize library components
const { Model, DataTypes } = require("sequelize");
// Import database connection from config.js
const sequelize = require("../config/connection");

// Initialize Product model by extending Sequelize's Model class
class Product extends Model {}

// Define schema for Product model
Product.init(
  {
    // Define columns in Product table
    id: {
      type: DataTypes.INTEGER, // Integer type
      allowNull: false, // Non-nullable
      primaryKey: true, // Primary Key
      autoIncrement: true, // Auto-incrementing
    },
    product_name: {
      type: DataTypes.STRING, // String type
      allowNull: false, // Non-nullable
    },
    price: {
      type: DataTypes.DECIMAL, // Decimal type
      allowNull: false, // Non-nullable
      isDecimal: true, // Validates for decimal values
    },
    stock: {
      type: DataTypes.INTEGER, // Integer type
      allowNull: false, // Non-nullable
      isNumeric: true, // Validates for numeric values
      defaultValue: 10, // Default value if not provided
    },
    featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    category_id: {
      type: DataTypes.INTEGER, // Integer type
      references: {
        // Foreign Key reference to Category model
        model: "category", // Reference to Category model
        key: "id", // Key in Category model to reference
      },
    },
  },
  {
    sequelize, // Database connection instance
    timestamps: false, // No timestamps
    freezeTableName: true, // Prevent Sequelize from renaming the table
    underscored: true, // Use underscores instead of camelCasing
    modelName: "product", // Name of the model
  }
);

module.exports = Product; // Export the Product model
