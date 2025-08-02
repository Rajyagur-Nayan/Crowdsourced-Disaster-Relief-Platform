const express = require('express');
const nodemailer = require("nodemailer");
require('dotenv').config();
const { DBconnect, connection } = require('../../connections/DB.connect.js');
const { generateToken, verifyToken } = require('../../utils/jwt.js');
const { hashPassword, comparePassword } = require('../../utils/hash.js');
const generateOTP = require('../../controllers/createOTP.controllers.js')

const router = express.Router();

// functions
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'dhruvboghani624@gmail.com',
        pass: 'ampf tloo ipml qytm'
    }
});

// routes
router.get('/', async (req, res) => {
    try {
        // const token = req.cookies.otpToken;
        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvdHAiOiIzNzcyNzkiLCJpYXQiOjE3NTM0MTU1MTB9.j8DA0qy60YMeNoCp57h37QGpKa22o2897-ASDOs29Tc';
        const email = req.query.email;
        const otp = req.query.otp;

        const data = verifyToken(token);

        const DBres = await connection.query(
            'SELECT * FROM "users" WHERE email = $1',
            [email]
        );

        if (DBres.rows.length > 0) {
            if (DBres.rows[0].is_verified) {
                console.log("User allready exist and verified");
                res.status(400).json({ exists: 'User allready exist and verified' });
            }
            if (data.otp == otp) {
                const DBres1 = await connection.query('UPDATE "users" SET is_verified = true WHERE email = $1 RETURNING *', [email])
                res
                    .status(200)
                    .json({ "user": DBres1.rows[0] })

            } else {
                res
                    .status(200)
                    .json({ "error": "wrong otp" })
            }
        } else {
            res
                .status(404)
                .send("❌ User does not exist");
        }

    } catch (error) {
        console.log(error);

    }
});

router.post('/', async (req, res) => {
    try {
        const password = await hashPassword(req.body.password);
        const DBres2 = await connection.query('SELECT * FROM "users" WHERE email = $1', [req.body.email]);
        console.log(DBres2.rows)
        if (DBres2.rows.length > 0) {
            if (!(DBres2.rows[0].isVerified)) {
                await connection.query('DELETE FROM "users" WHERE email = $1', [req.body.email]);
            }
        }

        await connection.query(
            `INSERT INTO "users" (email, password_hash, display_name, is_verified) VALUES ($1, $2, $3, $4) RETURNING *`,
            [req.body.email, password, req.body.name, false]
        );

        const otp = generateOTP(6);
        const token = generateToken({ "otp": otp });
        (async () => {
            const info = await transporter.sendMail({
                from: '"beatAura online Music plyer" <dhruvboghani624@gmail.com>',
                to: `${req.body.email}`,
                subject: "otp for signup in beatAura",
                text: `hello ${req.body.name} your otp is ${otp} for sign up into beadAura`
            });

            console.log("Message sent:", info.messageId);
        })();

        res.status(200).cookie('otpToken', token, {
            expires: new Date(Date.now() + 5 * 60000) // cookie will be removed after 5 min
        }).json({ "otpToken": token, "otp": otp });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Signup failed' });
    }
});

module.exports = router;
