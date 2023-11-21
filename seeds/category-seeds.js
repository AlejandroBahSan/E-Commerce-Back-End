const { Category } = require("../models"); // Import the Category model
// Array of category data to be seeded into the database
const categoryData = [
  // Each object represents a category with a name
  {
    category_name: "Shirts",
  },
  {
    category_name: "Shorts",
  },
  {
    category_name: "Music",
  },
  {
    category_name: "Hats",
  },
  {
    category_name: "Shoes",
  },
];
// Function to seed categories into the database using bulkCreate
const seedCategories = () => Category.bulkCreate(categoryData);
// Export the seeding function
module.exports = seedCategories;
