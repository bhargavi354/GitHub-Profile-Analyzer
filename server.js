require("dotenv").config();

const express = require("express");
const app = express();

const githubRoutes = require("./routes/githubRoutes");

console.log("GitHub Routes Loaded");

app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.send("Server Running");
});

// GitHub Routes
app.use("/api/github", githubRoutes);

// Start Server
app.listen(5000, () => {
  console.log("Server Running on Port 5000");
});