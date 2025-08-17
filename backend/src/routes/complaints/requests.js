const express = require('express');
const router = express.Router();
const { generateToken, verifyToken } = require('../../utils/jwt.js');
const pool = require('../../connections/DB.connect.js');

// Middleware to extract user from cookie
function authenticateToken(req, res, next) {
    const token = req.cookies?.login_token;

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
    const { full_name, help_type, description, urgency_level, location, latitude, longitude, phone_number } = req.body;
    const lat = latitude ?? 10.00;
    const long = longitude ?? 10.00;
    const user_id = req.user.id;

    if (!help_type || !urgency_level || !location) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const result = await pool.query(
            `INSERT INTO requests (user_id, full_name, help_type, description, urgency_level, location, latitude, longitude, phone_no )
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
            [user_id, full_name || null, help_type, description || null, urgency_level, location, lat, long, phone_number]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error inserting request:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
