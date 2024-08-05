// apiRoutes.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Define the file path for storing notes
const notesFilePath = path.join(__dirname, '..', '..', 'db', 'db.json');

// Retrieve all notes
router.get('/notes', (req, res) => {
    fs.readFile(notesFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read notes' });
        }
        res.json(JSON.parse(data));
    });
});

// Create a new note
router.post('/notes', (req, res) => {
    const newNote = req.body;

    fs.readFile(notesFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read notes' });
        }

        const notes = JSON.parse(data);
        newNote.id = notes.length ? notes[notes.length - 1].id + 1 : 1;
        notes.push(newNote);

        fs.writeFile(notesFilePath, JSON.stringify(notes), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to save note' });
            }
            res.json(newNote);
        });
    });
});

// Delete a note
