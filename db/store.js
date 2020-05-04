const util = require('util')
const fs = require('fs')

var uuid = require('uuid');
// // const uuidv1 = require('uuid/v1')
const { v1: uuidv1 } = require('uuid');
uuidv1();

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
  read() {
    return readFileAsync("./db/db.json", "utf8");
  }

  write(note) {
    return writeFileAsync("./db/db.json", JSON.stringify(note));
  }

  getNotes() {
    return this.read().then(notes => {
      let parsedNotes;

      // If notes isn't an array or can't be turned into one, send back a new empty array
      try {
        parsedNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        parsedNotes = [];
      }

      return parsedNotes;
    });
  }

  addNote(note) {
    const { title, text } = note;

    //condition to see if notes has any text in title or text fields
    if(!title||!text){
      throw new Error("title and text cannot be blank");
    }

    const newNote = {title, text, id: uuidv1()};
    
    return this.getNotes()
    .then(notes => [...notes, newNote])
    .then(updatedNotes => this.write(updatedNotes))
    .then(() => newNote);
  }

  removeNote(id) {
    return this.getNotes()
    .then(notes => notes.filter(note => note.id !==id))
    .then(filteredNotes => this.write(filteredNotes));
  }

}

module.exports = new Store();