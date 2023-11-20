const { Model, DataTypes } = require("sequelize"); // Import Sequelize library components
const sequelize = require("../config/connection"); // Import database connection

// Define ProductTag class extending Sequelize Model
class ProductTag extends Model {}

// Initialize ProductTag model with schema definition
ProductTag.init(
  {
    // Define columns in ProductTag table
    id: {
      type: DataTypes.INTEGER, // Column type
      allowNull: false, // Non-nullable
      primaryKey: true, // Primary Key
      autoIncrement: true, // Auto-incrementing
    },
    product_id: {
      type: DataTypes.INTEGER, // Column type for product ID
      references: {
        // Foreign Key reference
        model: "product", // Reference to Product model
        key: "id", // Key in Product model to reference
      },
    },
    tag_id: {
      type: DataTypes.INTEGER, // Column type for tag ID
      references: {
        // Foreign Key reference
        model: "tag", // Reference to Tag model
        key: "id", // Key in Tag model to reference
      },
    },
  },
  {
    sequelize, // Database connection instance
    timestamps: false, // No timestamps
    freezeTableName: true, // Prevent Sequelize from renaming the table
    underscored: true, // Use underscores instead of camelCasing
    modelName: "product_tag", // Name of the model
  }
);

module.exports = ProductTag; // Export the ProductTag model
