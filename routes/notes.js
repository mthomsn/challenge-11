const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET route
notes.get('/', (req, res) => {
  console.info(`${req.method} request received`);

  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
})

// POST route
notes.post('/', (req, res) => {
  console.info(`${req.method} request received to add a tip`);
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      tip_id: uuid(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Tip added successfully 🚀`);
  } else {
    res.json('Error in adding tip');
  }
});

// DELETE route

module.exports = notes;