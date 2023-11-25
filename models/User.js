const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection.js");

class User extends Model {}

User.init(
  {
    // Model attributes
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user", // Default role is 'user'
      validate: {
        isIn: [["user", "admin"]], // Allowable values are 'user' and 'admin'
      },
    },
  },
  {
    sequelize,
    timestamps: true, // Enable timestamps
    underscored: true, // Use snake_case instead of camelCase for the database attributes
    modelName: "User", // Model name used in sequelize
    tableName: "users", // Table name if different from the model name
    paranoid: true, // Enable soft deletes (won't actually delete entries but set a deletedAt timestamp)
    createdAt: "created_at", // Custom column name for createdAt
    updatedAt: "updated_at", // Custom column name for updatedAt
    deletedAt: "deleted_at", // Custom column name for deletedAt if paranoid is true
  }
);

module.exports = User;
