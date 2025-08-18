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
        const { request_id } = req.body;
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
            'INSERT INTO activity (request_id, volunteer_id, last_update) VALUES ($1, $2, $3)',
            [request_id, user_id, `${userCheck.rows[0].name} accept the Task`]
        );

        await pool.query(
            'UPDATE "requests" SET status = $1 WHERE request_id = $2',
            ['In Progress', request_id]
        );

        res.status(200).json({ message: 'Task accepted and activity logged.' });

    } catch (err) {
        console.error('Error accepting task:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/complete', authenticateToken, async (req, res) => {
    try {
        const { request_id } = req.body;
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
        await pool.query(
            `UPDATE activity SET last_update = $1, updated_at = CURRENT_TIMESTAMP WHERE request_id = $2 AND volunteer_id = $3`,
            [`${userCheck.rows[0].name} complete the Task`, request_id, user_id]
        );

        await pool.query(
            'UPDATE "requests" SET status = $1 WHERE request_id = $2',
            ['Fulfilled', request_id]
        );

        res.status(200).json({ message: 'Task completed and activity logged.' });

    } catch (err) {
        console.error('Error accepting task:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/stats', authenticateToken, async (req, res) => {
    try {
        const user_id = req.user.id;

        // Check if user exists
        const userCheck = await pool.query('SELECT * FROM "users" WHERE id = $1', [user_id]);
        if (userCheck.rows.length === 0) {
            return res.status(404).json({ message: 'User not found. Please re-login.' });
        }

        // Ensure the user is a volunteer
        if (userCheck.rows[0].role !== 'volunteer') {
            return res.status(403).json({ message: 'Only volunteers have tasks for complete' });
        }

        const DBres = await pool.query('SELECT * FROM "activity" WHERE volunteer_id = $1', [user_id]);
        const result = await pool.query(
            `SELECT COUNT(*) AS pending_count
            FROM requests
            WHERE status = 'In Progress'
            AND id IN (
            SELECT request_id
            FROM activity
            WHERE volunteer_id = $1 )`,
            [user_id]
        );

        const count = parseInt(result.rows[0].pending_count);
        const data = {
            'task_accepted': DBres.rows.length,
            'task_completed': (DBres.rows.length - count),
            'task_pending': count
        }

        res.status(200).json(data);
    } catch (err) {
        console.error('Error accepting task:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/', authenticateToken, async (req, res) => {
    try {
        const user_id = req.user.id;

        // Check if user exists
        const userCheck = await pool.query('SELECT * FROM "users" WHERE id = $1', [user_id]);
        if (userCheck.rows.length === 0) {
            return res.status(404).json({ message: 'User not found. Please re-login.' });
        }

        // Ensure the user is a volunteer
        if (userCheck.rows[0].role !== 'volunteer') {
            return res.status(403).json({ message: 'Only volunteers have tasks for complete' });
        }

        const DBres = await pool.query('SELECT * FROM "requests" WHERE status = $1 ORDER BY created_at DESC', ['Pending']);

        res.status(200).json(DBres.rows);
    } catch (err) {
        console.error('Error accepting task:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
