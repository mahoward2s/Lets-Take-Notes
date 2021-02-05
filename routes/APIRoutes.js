//dependencies and do not know if i need them...
const fs = require('fs');
const path = require('path');

const storedNotes = require('../db/store');

// API Routes

module.exports = (app) => {
    //sets note variable
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        var notes = JSON.parse(data);

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

        // API delete request
        app.delete('/api/notes/:id', (req, res) => {
            notes.splice(req.params.id, 1);
            updateDb();
            return console.log('Successfully deleted note with id: ' + req.params.id);
        });

        //updates the json file whenever a note is added or deleted
        function updateDb() {
            fs.writeFile('db/db.json', JSON.stringify(notes, '\t'), err => {
                if (err) throw err;
                return true;
            });
        }
    });
};
