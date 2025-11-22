const express = require("express");
const router = express.Router();
const pool = require("../db");
const auth = require("../middleware/auth");
// Get all expenses
// Get all expenses
router.get("/", auth, async (req, res) => {
  try {
    const userId = req.userId;
    const result = await pool.query(
      "SELECT * FROM expenses WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add an expense
router.post("/", auth, async (req, res) => {
  try {
    const { name, amount, category } = req.body;
    const userId = req.userId;
    const result = await pool.query(
      "INSERT INTO expenses (name, amount, category, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, amount, category, userId]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
