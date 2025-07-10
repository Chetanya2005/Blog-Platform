const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Middleware
app.use(express.json());

// 🔗 Direct MongoDB URI (no .env required)
const mongoURI = "mongodb://127.0.0.1:27017/blogdb"; // Local MongoDB
// const mongoURI = "your-atlas-uri"; // Atlas ho to yahan paste karna

// MongoDB connection
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Sample route
app.get("/", (req, res) => {
  res.send("Blog API running...");
});

// Server start
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
