const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const pool = require('../../connections/DB.connect'); // PostgreSQL pool connection

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// POST route
router.post('/', upload.single('photo'), async (req, res) => {
  const {
    fullName,
    phoneNumber,
    location,
    helpType,
    description,
    urgencyLevel
  } = req.body;

  const photoPath = req.file ? req.file.path : null;

  try {
    const result = await pool.query(
      `INSERT INTO help_requests 
        (full_name, phone_number, location, help_type, description, urgency_level, photo_path) 
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`,
      [fullName, phoneNumber, location, helpType, description, urgencyLevel, photoPath]
    );

    res.status(201).json({
      message: 'Help request stored in database',
      data: result.rows[0]
    });
  } catch (err) {
    console.error('❌ Error saving to DB:', err);
    res.status(500).json({ error: 'Failed to save help request' });
  }
});

module.exports = router;
