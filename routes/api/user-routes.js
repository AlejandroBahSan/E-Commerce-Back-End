const jwt = require("jsonwebtoken");
require("dotenv").config();
const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../../models/User");
const authenticate = require("../user-login/middleware/authenticate");
const isAdmin = require("../user-login/middleware/isAdmin");

// Get all categories including associated Products
router.get("/", async (req, res) => {
  try {
    const dbUser = await User.findAll({});
    res.status(200).json(dbUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// User login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// // Get all categories including associated Products
// router.get("/", async (req, res) => {
//   try {
//     const dbCategory = await Category.findAll({
//       include: [
//         {
//           model: Product,
//           // attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
//         },
//       ],
//     });
//     res.status(200).json(dbCategory);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// Create a new user (admin only)
router.post("/", [authenticate, isAdmin], async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role || "user",
    });
    res
      .status(201)
      .json({ message: "User created successfully", userId: newUser.id });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update a user (admin only)
router.put("/:id", [authenticate, isAdmin], async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).send("User not found.");
    }

    // Update user details
    if (req.body.email) {
      user.email = req.body.email;
    }
    if (req.body.role) {
      user.role = req.body.role;
    }
    // Uncomment the below code to allow password updates
    // if (req.body.password) {
    //     user.password = await bcrypt.hash(req.body.password, 10);
    // }

    await user.save();
    res.json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete a user (admin only)
router.delete("/:id", [authenticate, isAdmin], async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).send("User not found.");
    }

    await user.destroy();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
