//dependencies and do not know if i need them...
const fs = require('fs');
const path = require('path');

const storedNotes = require('../db/store');

// API Routes

module.exports = (app) => {
    // API GET Requests
    app.get('/api/notes', (req, res) => res.json(notes));

    // API POST Requests
    app.post('/api/notes', (req, res) => {
        let newNote = req.body;
        notes.push(newNote);
        updateDb();
        return console.log('Successfully added new note: ' + newNote.title);
    });

    //Retrieves a note with a specific id
    app.get('/api/notes/:id', (req, res) => res.json(notes[req.params.id]));


    // I added this below code so you could clear out the table while working with the functionality.
    // Don"t worry about it!

    app.post('/api/clear', (req, res) => {
        // Empty out the arrays of data
        tableData.length = 0;
        waitListData.length = 0;

        res.json({ ok: true });
    });
};
