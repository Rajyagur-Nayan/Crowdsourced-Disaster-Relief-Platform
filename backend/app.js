const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // your frontend URL
  credentials: true,               // allow cookies
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.get('/', (req, res) => {
    res.send('API is running 🚀');
});

app.use('/signup', require('./src/routes/user/signup.js'));
app.use('/login', require('./src/routes/user/login.js'));

module.exports = app