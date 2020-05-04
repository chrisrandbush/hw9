// TODO: importing the store
const store = require("../db/store");
// building out route
const router = require("express").Router();
// and using these routes to call your store methods

// GET "/api/notes" responds with all notes from the database
router.get("/notes", function(req, res) {
    store
      .getNotes()
      .then(notes => res.json(notes))
      .catch(err => res.status(500).json(err));
  });


  //write the funcitonality for router.post and router.delete
 
router.post("/notes", function(req, res) {
    store
      .addNote(req.body)
      .then(notes => res.json(notes))
      .catch(err => res.status(500).json(err));
  });
  
router.delete("/notes/:id", function(req, res) {
    store
      .removeNote()
      .then(notes => res.json(notes))
      .catch(err => res.status(500).json(err));
  });

 //module exports statement
 module.exports =  router;

