const express = require('express');
const router = express.Router();
const pool = require('../../connections/DB.connect.js');

// GET all fulfilled help requests with coordinates
router.get('/map', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT id, full_name, help_type, description, latitude, longitude
            FROM requests
            WHERE status = 'Pending' AND latitude IS NOT NULL AND longitude IS NOT NULL
        `);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching map data:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/volunteer', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT full_name, help_type, description, location, urgency_level, created_at
            FROM requests
            WHERE status = 'Pending' 
            ORDER BY created_at DESC 
        `);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching map data:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
