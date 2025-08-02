const express = require('express');

const app = express();


// app.use(cors());
// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.get('/', (req, res) => {
    res.send('API is running 🚀');
});

app.use('/signup', require('./routes/user/signup.js'));
app.use('/login', require('./routes/user/login.js'));
app.use('/playlist', require('./routes/playlist/playlist.js'));
app.use('/playlist/add', require('./routes/playlist/add.js'));
app.use('/like', require('./routes/like/like.js'));



module.exports = app