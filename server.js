const fs = require('fs');
const express = require('express');
const path = require('path');
const notesData = require('./db/db.json');

const app = express();
const PORT = 3001;

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET route for getting notes page and existing notes
app.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received to get notes`);
    fs.readFile('db.json', 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading db.json:', err.message);
            res.status(500).json({ error: 'Error fetching data' });
        }
        else {
            // Send parsed db.json data
            try {
                const ;
            } catch (error) {

            }
        }
    });
    return res.status(200).json(notesData);
});

// POST route for new notes
app.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a review`);

    // Destructuring new note for the items in req.body
    const { title, text } = req.body;

    // New note info
    const newNote = {
        title: title,
        text: text
    };

    // Import existing notes from db.json
    let existingNotes = [];
    try {
        const data = fs.readFileSync('db.json');
        existingNotes = JSON.parse(data);
    }
    catch (err) {
        console.error('Error reading data.json:', err.message);
    }

    // Add new note to existing notes
    existingNotes.push(newNote);

    // Save updated existingNotes to db.json
    fs.writeFile('db.json', JSON.stringify(existingNotes, null, 2), (err) => {
        if (err) {
            console.error('Error writing data to db.json:', err.message);
            res.status(500).send('Error saving to db.json');
        }
        else {
            res.send('Data saved to db.json');
        }
    });
});

app.listen(PORT, () => {
    console.log(`App listening on port http://localhost:${PORT}`);
});

