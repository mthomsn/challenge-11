const express = require('express');
const index = express();
const uuid = require('../helpers/uuid');
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

// GET route
index.get('/notes', (req, res) => {
  console.info(`${req.method} request received.`);

  readFromFile('../db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST route

// DELETE route

module.exports = index;