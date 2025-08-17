const express = require("express");
const router = express.Router();
const pool = require("../../connections/DB.connect.js");
const authMiddleware = require("../../middleware/authMiddleware.js");

// GET user profile
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // 👈 now work

    const result = await pool.query(
      "SELECT id, role FROM users WHERE id = $1",
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
