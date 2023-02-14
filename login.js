const express = require('express');
const app = express();

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.get('/style.css', (req, res) => {
    res.set('Content-Type', 'text/css');
    res.sendFile(__dirname + '/style.css');
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000/login');
});

