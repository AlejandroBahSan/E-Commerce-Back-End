const { Model, DataTypes } = require("sequelize"); // Import Sequelize library components
const sequelize = require("../config/connection.js"); // Import database connection

// Define Tag class extending Sequelize Model
class Tag extends Model {}

// Initialize Tag model with schema definition
Tag.init(
  {
    // Define columns in Tag table
    id: {
      type: DataTypes.INTEGER, // Column type
      allowNull: false, // Non-nullable
      primaryKey: true, // Primary Key
      autoIncrement: true, // Auto-incrementing
    },
    tag_name: {
      type: DataTypes.STRING, // Column type for tag name
    },
  },
  {
    sequelize, // Database connection instance
    timestamps: false, // No timestamps
    freezeTableName: true, // Prevent Sequelize from renaming the table
    underscored: true, // Use underscores instead of camelCasing
    modelName: "tag", // Name of the model
  }
);

module.exports = Tag; // Export the Tag model
