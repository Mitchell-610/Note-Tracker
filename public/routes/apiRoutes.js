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

// Delete a note
