const notes = require('express').Router();
const fs = require('fs');
const idGenerator = require('../helpers/uuid');

// GET: retrieve all notes
notes.get('/', (req, res) => {
  readFromFile('db/db.json', (data) => res.json(JSON.parse(data)));
})

// POST: append note
// notes.post('/', (req, res) => {});

// DELETE: delete note