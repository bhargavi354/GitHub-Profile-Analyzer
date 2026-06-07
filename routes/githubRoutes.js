const express = require("express");
const axios = require("axios");
const db = require("../config/db");

const router = express.Router();

console.log("githubRoutes.js loaded");

// Test Route
router.get("/test", (req, res) => {
  res.send("ROUTE WORKING");
});

// Get All Stored Profiles
router.get("/profiles/all", (req, res) => {
  db.query(
    "SELECT * FROM github_profiles",
    (err, results) => {
      if (err) {
        return res.status(500).json({
          success: false,
          error: err.message
        });
      }

      res.json({
        success: true,
        count: results.length,
        data: results
      });
    }
  );
});

// Fetch GitHub Profile + Save to DB
router.get("/:username", async (req, res) => {
  try {
    const username = req.params.username;

    const response = await axios.get(
      `https://api.github.com/users/${username}`
    );

    const user = response.data;

    const sql = `
      INSERT INTO github_profiles
      (username, name, followers, following, public_repos, avatar_url, profile_url)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
      name = VALUES(name),
      followers = VALUES(followers),
      following = VALUES(following),
      public_repos = VALUES(public_repos),
      avatar_url = VALUES(avatar_url),
      profile_url = VALUES(profile_url)
    `;

    db.query(sql, [
      user.login,
      user.name,
      user.followers,
      user.following,
      user.public_repos,
      user.avatar_url,
      user.html_url
    ]);

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