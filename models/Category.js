const { Model, DataTypes } = require("sequelize"); // Import Sequelize library components
const sequelize = require("../config/connection.js"); // Import database connection

// Initialize Category model by extending Sequelize's Model class
class Category extends Model {}

// Define schema for Category model
Category.init(
  {
    // Define columns in Category table
    id: {
      type: DataTypes.INTEGER, // Integer type
      allowNull: false, // Non-nullable
      primaryKey: true, // Primary Key
      autoIncrement: true, // Auto-incrementing
    },
    category_name: {
      type: DataTypes.STRING, // String type
      allowNull: false, // Non-nullable
    },
  },
  {
    sequelize, // Database connection instance
    timestamps: false, // No timestamps
    freezeTableName: true, // Prevent Sequelize from renaming the table
    underscored: true, // Use underscores instead of camelCasing
    modelName: "category", // Name of the model
  }
);

module.exports = Category; // Export the Category model
