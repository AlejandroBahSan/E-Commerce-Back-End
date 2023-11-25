const seedCategories = require("./category-seeds"); // Import category seeding function
const seedProducts = require("./product-seeds"); // Import product seeding function
const seedTags = require("./tag-seeds"); // Import tag seeding function
const seedProductTags = require("./product-tag-seeds"); // Import product-tag seeding function
const sequelize = require("../config/connection"); // Import Sequelize connection

// Async function to seed all data
const seedAll = async () => {
  await sequelize.sync({ force: true }); // Synchronize database (force: true to drop and recreate tables)
  console.log("\n----- DATABASE SYNCED -----\n");

  await seedCategories(); // Seed categories
  console.log("\n----- CATEGORIES SEEDED -----\n");

  await seedProducts(); // Seed products
  console.log("\n----- PRODUCTS SEEDED -----\n");

  await seedTags(); // Seed tags
  console.log("\n----- TAGS SEEDED -----\n");

  await seedProductTags(); // Seed product-tags associations
  console.log("\n----- PRODUCT TAGS SEEDED -----\n");

  process.exit(0); // Exit the process
};

seedAll(); // Execute the seeding process
