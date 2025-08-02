const express = require('express');
const { generateToken, verifyToken } = require('../../utils/jwt.js');
const { hashPassword, comparePassword } = require('../../utils/hash.js');
const generateOTP = require('../../controllers/createOTP.controllers.js');
const { DBconnect, connection } = require('../../connections/DB.connect.js');

require('dotenv').config();

const router = express.Router();


router.post('/', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const DBres = await connection.query('SELECT * FROM "users" WHERE email = $1', [email]);

    if (DBres.rows.length == 0) {
        res.status(404).send('wrong email id');
    } else if (!(DBres.rows[0].is_verified)) {
        res.status(400).send('user not verified');
    } else if (await comparePassword(password, DBres.rows[0].password_hash)) {
        console.log(DBres.rows[0]);
        const data = { "id": DBres.rows[0].id, "name": DBres.rows[0].display_name }
        const token = generateToken(data);
        res
            .status(200)
            .cookie('login_token', token) // ✅ valid cookie name
            .json({ login_token: token, data });
    } else {
        res.status(400).send('wrong password');
    }
})

module.exports = router;