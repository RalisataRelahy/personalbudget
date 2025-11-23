const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
// Signup
router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
            [username, email, hashedPassword]
        );
        res.json({ user: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: "User already exists or DB error" });
    }
});

// Login
router.post("/login", async (req, res) => {
    const { identifier, password } = req.body; // username or email

    try {
        const result = await pool.query(
            "SELECT * FROM users WHERE username = $1 OR email = $1",
            [identifier]
        );
        const user = result.rows[0];
        if (!user) return res.status(400).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid password" });

        const token = jwt.sign({ id: user.id }, "secretkey", { expiresIn: "8h" });
        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});
//budget
router.get("/budget", auth, async (req, res) => {
    try {
        const userId = req.userId;
        const result = await pool.query(
            "SELECT budget FROM users WHERE id = $1",
            [userId]
        );
        res.json({ budget: result.rows[0].budget });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});
// Modifier le budget
router.put("/budget", auth, async (req, res) => {
    try {
        const userId = req.userId;
        const { budget } = req.body;
        const result = await pool.query(
            "UPDATE users SET budget = $1 WHERE id = $2 RETURNING *",
            [budget, userId]
        );
        res.json({ budget: result.rows[0].budget });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Get current user info
router.get("/me", auth, async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT id, username, email, budget,created_at FROM users WHERE id = $1",
            [req.userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ user: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.put("/password", auth, async (req, res) => {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
        return res.status(400).json({ error: "All fields are required" });
    }

    if (newPassword !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
    }

    try {
        const userId = req.userId;

        const user = await pool.query("SELECT * FROM users WHERE id=$1", [userId]);
        if (user.rows.length === 0) return res.status(404).json({ error: "User not found" });

        const valid = await bcrypt.compare(currentPassword, user.rows[0].password);
        if (!valid) return res.status(401).json({ error: "Current password is incorrect" });
        console.log({ currentPassword, userPassword: user.rows[0].password });
        const hashed = await bcrypt.hash(newPassword, 10);

        await pool.query(
            "UPDATE users SET password=$1 WHERE id=$2",
            [hashed, userId]
        );

        return res.json({ message: "Password updated successfully" });
    } catch (err) {
        console.error("Password update error:", err);
        res.status(500).json({ error: "Server error" });
    }
});
// routes/login&signup.js
router.delete("/me", auth, async (req, res) => {
    try {
        const userId = req.userId;

        // Delete user from database
        const result = await pool.query(
            "DELETE FROM users WHERE id = $1 RETURNING id, username",
            [userId]
        );

        if (result.rows.length === 0)
            return res.status(404).json({ error: "User not found" });

        res.json({ message: "Account deleted successfully", user: result.rows[0] });
    } catch (err) {
        console.error("Delete account error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
