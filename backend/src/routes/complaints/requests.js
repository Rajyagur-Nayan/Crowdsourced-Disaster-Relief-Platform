const express = require('express');
const router = express.Router();
const { generateToken, verifyToken } = require('../../utils/jwt.js');
const pool = require('../../connections/DB.connect.js');

// Middleware to extract user from cookie
function authenticateToken(req, res, next) {
    // const token = req.cookies?.token;
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVkYmFmMTg5LTMzYzItNDM4MS1hOGFkLWU4MTBjNzY0MzY5MiIsIm5hbWUiOiJBbGljZSIsInJvbGUiOiJ2b2x1bnRlZXIiLCJpYXQiOjE3NTQxNTA3NDR9.M2heONDvrj5CNJO0zqbBlVmYnpUvnsccDd0bJzmHAG4';

    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
        const decoded = verifyToken(token)
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid token' });
    }
}

// POST /api/requests
router.post('/', authenticateToken, async (req, res) => {
    const { full_name, help_type, description, urgency_level, location, latitude, longitude } = req.body;
    const user_id = req.user.id;

    if (!help_type || !urgency_level || !location) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const result = await pool.query(
            `INSERT INTO requests (user_id, full_name, help_type, description, urgency_level, location, latitude, longitude )
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [user_id, full_name || null, help_type, description || null, urgency_level, location, latitude, longitude ]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error inserting request:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
