const fs = require('fs');
const express = require('express');
const path = require('path');
const notesData = require('./db/db.json');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

// GET route for getting existing notes
app.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received to get notes`);

    return res.status(200).json(notesData);
});

// POST route for new notes
app.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a note`);

    // Destructuring new note for the items in req.body
    const { title, text, id } = req.body;

    // New note info
    const newNote = {
        title,
        text,
        id
    };

    // Import existing notes from db.json
    let existingNotes;
    try {
        const data = fs.readFileSync('./db/db.json');
        existingNotes = JSON.parse(data);
    }
    catch (err) {
        console.error('Error reading data.json:', err.message);
    }

    // Add new note to existing notes
    existingNotes.push(newNote);

    // Save updated existingNotes to db.json
    fs.writeFile('./db/db.json', JSON.stringify(existingNotes, null, 2), (err) => {
        if (err) {
            console.error('Error writing data to db.json:', err.message);
            res.status(500).send('Error saving to db.json');
        }
        else {
            res.send('Data saved to db.json');
        }
    });

    return res.status(200).json(existingNotes);
});

app.listen(PORT, () => {
    console.log(`App listening on port http://localhost:${PORT}`);
});

