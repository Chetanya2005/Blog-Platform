const bcrypt = require("bcrypt");
const User = require("../models/User");

// Signup Controller
exports.signup = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });

  } catch (err) {
    res.status(500).json({ error: "Server error during signup" });
  }
};

// Login Controller
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Set session (if using express-session)
    req.session.user = user;

    res.status(200).json({
      message: "Login successful",
      user: { username: user.username }
    });

  } catch (err) {
    res.status(500).json({ error: "Server error during login" });
  }
};

// Logout Controller
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: "Logout failed" });
    res.status(200).json({ message: "Logged out successfully" });
  });
};
