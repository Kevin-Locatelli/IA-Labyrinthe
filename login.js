const express = require('express');
const app = express();

app.get('/login', (req, res) => {
<<<<<<< Updated upstream
    res.send('<form method="POST" action="/login">' +
             '<label for="username">Username:</label>' +
             '<input type="text" id="username" name="username">' +
             '<br>' +
             '<label for="password">Password:</label>' +
             '<input type="password" id="password" name="password">' +
             '<br><br>' +
             '<input type="submit" value="Submit">' +
             '</form>');
});

app.post('/login', (req, res) => {
    // Handle form submission here
});
              
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
=======
    res.sendFile(__dirname + '/login.html');
});

app.get('/style.css', (req, res) => {
    res.set('Content-Type', 'text/css');
    res.sendFile(__dirname + '/style.css');
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000/login');
});
>>>>>>> Stashed changes
