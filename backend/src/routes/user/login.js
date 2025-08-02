const express = require('express');
const { generateToken, verifyToken } = require('../../utils/jwt.js');
const { hashPassword, comparePassword } = require('../../utils/hash.js');
const generateOTP = require('../../controllers/createOTP.controllers.js');
const pool = require('../../connections/DB.connect.js');

require('dotenv').config();

const router = express.Router();

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const DBres = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        if (DBres.rows.length === 0) {
            return res.status(404).json({ error: 'Wrong email' });
        }

        const user = DBres.rows[0];

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Wrong password' });
        }

        const data = { id: user.id, name: user.name, role: user.role };
        const token = generateToken(data);

        res
            .status(200)
            .cookie('login_token', token, {
                httpOnly: true,
                secure: false,        // ⚠️ false for localhost (true for HTTPS)
                sameSite: 'lax',      // or 'none' only if using secure: true
                maxAge: 24 * 60 * 60 * 7000 // 7 day
            })
            .json({ message: 'Login successful', token, user: data });

    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;