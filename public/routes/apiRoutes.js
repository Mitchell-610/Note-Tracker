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
router.delete('/notes/:id', (req, res) => {
    const noteId = parseInt(req.params.id, 10);
    console.log('Delete request received for note ID:', noteId); // Log the ID received


    fs.readFile(notesFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading notes file:', err.message);
            return res.status(500).json({ error: 'Failed to read notes' });
        }

        let notes = JSON.parse(data);
        console.log('Current notes:', notes); // Log the current notes

        notes = notes.filter(note => note.id !== noteId);
        console.log('Notes after filtering:', notes); // Log notes after filtering


        fs.writeFile(notesFilePath, JSON.stringify(notes), (err) => {
            if (err) {
                console.error('Error writing notes file:', err.message);
                return res.status(500).json({ error: 'Failed to delete note' });
            }
            console.log('Note deleted successfully')
            res.status(204).end();
        });
    });
});

