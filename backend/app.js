const express = require('express');
const cors = require('cors');
const complaintRoutes = require('./src/routes/complaints/complaints');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
 app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.get('/', (req, res) => {
    res.send('API is running 🚀');
});

app.use('/signup', require('./src/routes/user/signup.js'));
app.use('/login', require('./src/routes/user/login.js'));

// Ensure uploads directory exists
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Static file serving for uploaded files (optional)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/request-help', complaintRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Disaster Help API Running');
});

module.exports = app