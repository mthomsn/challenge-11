const router = require('express').Router();
const dbActions = require('../db/actions')

// GET route
router.get('/', (req, res) => {
  dbActions
    .getNotes()
    .then((notes) => {
      return res.json(notes);
    })
    .catch((err) => res.status(500).json(err));
})

// POST route
router.post('/', (req, res) => {
  dbActions
    .addNote(req.body)
    .then((note) => res.json(note))
    .catch((err) => res.status(500).json(err));
});

// DELETE route
router.delete('/:id', (req, res) => {
  dbActions
    .removeNote(req.params.id)
    .then(() => res.json({ ok: true }))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;