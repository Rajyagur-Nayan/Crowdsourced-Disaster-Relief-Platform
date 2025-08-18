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

// routes
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { request_id, remark } = req.body;
        const user_id = req.user.id;

        // Check if user exists
        const userCheck = await pool.query('SELECT * FROM "users" WHERE id = $1', [user_id]);
        if (userCheck.rows.length === 0) {
            return res.status(404).json({ message: 'User not found. Please re-login.' });
        }

        // Ensure the user is a volunteer
        if (userCheck.rows[0].role !== 'volunteer') {
            return res.status(403).json({ message: 'Only volunteers can accept tasks.' });
        }

        // Insert into activity table
        const insertRes = await pool.query(
            `UPDATE activity SET last_update = $1, updated_at = CURRENT_TIMESTAMP WHERE request_id = $2 AND volunteer_id = $3`,
            [remark, request_id, user_id]
        );

        res.status(200).json({ message: `remark is added : ${remark}` });

    } catch (err) {
        console.error('Error accepting task:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;