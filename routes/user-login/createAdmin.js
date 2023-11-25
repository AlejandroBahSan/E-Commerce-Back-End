require("dotenv").config();
const bcrypt = require("bcrypt");
const User = require("../../models/User");

console.log("Current Working Directory:", process.cwd());

const createAdminUser = async () => {
  try {
    const hashedPassword = await bcrypt.hash(process.env.DB_ADMIN_PWD, 10);

    await User.create({
      email: process.env.DB_ADMIN_USER, // Replace with the admin's email
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin user created successfully");
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
};

module.exports = createAdminUser;
