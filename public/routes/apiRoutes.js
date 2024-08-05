// apiRoutes.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Define the file path for storing notes
const notesFilePath = path.join(__dirname, '..', '..', 'db', 'db.json');
