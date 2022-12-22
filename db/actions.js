const fs = require('fs');
const util = require('util');
const uuid = require('uuid');

const readFromFile = util.promisify(fs.readFile);
const writeToFile = util.promisify(fs.writeFile);

class dbActions {

  read() {
    return readFromFile('./db/db.json', 'utf8');
  }

  write(data) {
    return writeToFile('./db/db.json', JSON.stringify(data));
  }

  getNotes() {
    return this.read().then((data) => {
      let parsedNotes;

      try {
        parsedNotes = [].concat(JSON.parse(data));
      }
      catch (err) {
        parsedNotes = [];
      }

      return parsedNotes;
    });
  }

  addNote(note) {
    const { title, text } = note;

    if (!title || !text ) {
      throw new Error("Note needs a title and text.")
    }

    const newNote = { title, text, id: uuid.v4() };

    return this.getNotes()
      .then((notes) => [...notes, newNote])
      .then((updatedNotes) => this.write(updatedNotes))
      .then(() => newNote);
  }

  removeNote(id) {
    return this.getNotes()
      .then((notes) => notes.filter((note) => note.id !== id))
      .then((filteredNotes) => this.write(filteredNotes))
  }
}

module.exports = new dbActions();