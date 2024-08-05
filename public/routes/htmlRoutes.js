// htmlRoutes.js
const express = require('express');
const path = require('path');
const router = express.Router();

// Serve the landing page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Serve the notes page
