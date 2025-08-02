const express = require('express');
const router = express.Router();
const pool = require('../../connections/DB.connect.js');

router.get('/', async (req, res) => {
  try {
    const totalRequestsRes = await pool.query('SELECT COUNT(*) FROM "requests"');
    const pendingRequestsRes = await pool.query(`SELECT COUNT(*) FROM "requests" WHERE status = 'Pending'`);
    const fulfilledRequestsRes = await pool.query(`SELECT COUNT(*) FROM "requests" WHERE status = 'Fulfilled'`);
    const totalVolunteersRes = await pool.query(`SELECT COUNT(*) FROM "users" WHERE role = 'volunteer'`);

    const recentRequestsRes = await pool.query(`
      SELECT id, full_name AS requester, location, help_type, urgency_level, status, created_at 
      FROM "requests" 
      ORDER BY created_at DESC 
    `);

    const categoryCountRes = await pool.query(`
      SELECT help_type, COUNT(*) as count 
      FROM "requests" 
      GROUP BY help_type
    `);

    const requestCategories = {};
    categoryCountRes.rows.forEach(row => {
      requestCategories[row.help_type] = parseInt(row.count);
    });

    res.json({
      totalRequests: parseInt(totalRequestsRes.rows[0].count),
      pendingRequests: parseInt(pendingRequestsRes.rows[0].count),
      totalVolunteers: parseInt(totalVolunteersRes.rows[0].count),
      fulfilledRequests: parseInt(fulfilledRequestsRes.rows[0].count),
      recentHelpRequests: recentRequestsRes.rows,
      requestCategories: requestCategories
    });
  } catch (err) {
    console.error('Dashboard fetch error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
