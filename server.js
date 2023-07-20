const fs = require('fs');
const express = require('express');
const path = require('path');
const notesData = require('./db/db.json');

const app = express();
const PORT = 3001;

// Middleware
app.use(express.static('public'));

app.get('/api', (req, res) => {

});

app.get('/api/notes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/notes.html')));

app.post('/api/notes', (req, res) => {

});





app.listen(PORT, () => {
    console.log(`App listening on port http://localhost:${PORT}`);
});

