const { Tag } = require("../models"); // Import Tag model

// Array of tag data to be seeded into the database
const tagData = [
  {
    tag_name: "rock music",
  },
  {
    tag_name: "pop music",
  },
  {
    tag_name: "blue",
  },
  {
    tag_name: "red",
  },
  {
    tag_name: "green",
  },
  {
    tag_name: "white",
  },
  {
    tag_name: "gold",
  },
  {
    tag_name: "pop culture",
  },
];

// Function to seed tags into the database using bulkCreate
const seedTags = () => Tag.bulkCreate(tagData);

module.exports = seedTags; // Export the seeding function
