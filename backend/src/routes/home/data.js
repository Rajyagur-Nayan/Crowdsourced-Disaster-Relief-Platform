// routes/stats.js
const express = require('express');
const router = express.Router();
const pool = require('../../connections/DB.connect.js');

router.get('/', async (req, res) => {
    try {
        const [fulfilledRes, volunteersRes] = await Promise.all([
            pool.query(`SELECT COUNT(*) FROM "requests" WHERE status = 'Fulfilled'`),
            pool.query(`SELECT COUNT(*) FROM "users" WHERE role = 'volunteer'`)
        ]);

        const stats = {
            peopleHelped: parseInt(fulfilledRes.rows[0].count) || 0,
            activeVolunteers: parseInt(volunteersRes.rows[0].count) || 0,
            regionsCovered: 15 // Hardcoded for now
        };

        res.json(stats);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
