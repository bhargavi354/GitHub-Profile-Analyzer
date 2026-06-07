const express = require("express");
const axios = require("axios");

// const db = require("../config/db");

const router = express.Router();

console.log("githubRoutes.js loaded");

// Test Route
router.get("/test", (req, res) => {
  res.send("ROUTE WORKING");
});

// Get All Stored Profiles (Temporary Disabled)
router.get("/profiles/all", (req, res) => {
  res.json({
    success: false,
    message: "Database feature temporarily disabled"
  });
});

// Fetch GitHub Profile
router.get("/:username", async (req, res) => {
  try {
    const username = req.params.username;

    const response = await axios.get(
      `https://api.github.com/users/${username}`
    );

    const user = response.data;

    res.json({
      success: true,
      username: user.login,
      name: user.name,
      followers: user.followers,
      following: user.following,
      publicRepos: user.public_repos,
      avatar: user.avatar_url,
      profileUrl: user.html_url
    });

  } catch (error) {
    res.status(404).json({
      success: false,
      message: "GitHub user not found"
    });
  }
});

module.exports = router;