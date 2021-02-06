//dependencies and do not know if i need them...
const fs = require('fs');
const path = require('path');

//------------------------------------ API Routes-------------------------------------

module.exports = (app) => {
        // API GET Requests
        app.get('/api/notes', (req, res) => {
            let notes = readDb();
            return res.json(notes);
        });

        // API POST Requests
        app.post('/api/notes', (req, res) => {
            let newNote = req.body;
            let notes = readDb();
            let noteId = (notes.length).toString();
            newNote.id = noteId
            notes.push(newNote);
            updateDb(notes);
            return res.json(notes), console.log('Successfully added new note: ' + newNote.title);
        });

        //Retrieves a note with a specific id
        app.get('/api/notes/:id', (req, res) => {
            let notes = readDb();
            return res.json(notes[req.params.id])
        });

        // API delete request
        app.delete('/api/notes/:id', (req, res) => {
            let notes = readDb();
            app.get('/api/notes/:id', (req, res) => res.json(notes[req.params.id]));
            notes.splice(req.params.id, 1);
            updateDb(notes);
            return res.json(notes), console.log('Successfully deleted note with id: ' + req.params.id);
        });

        // ----------------------------------------HTML ROUTES--------------------

        app.get('/notes', (req, res) => {
            res.sendFile(path.join(__dirname, '../public/notes.html'));
        });

        // If no matching route is found default to home
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../public/index.html'));
        });

        //------------------------------------------------------------------------

        //updates the json file whenever a note is added or deleted
        function updateDb(notes) {
            fs.writeFileSync('db/db.json', JSON.stringify(notes, '\t'), err => {
                if (err) throw err;
                return true;
            });
        }
        function readDb (){
            const data = fs.readFileSync('db/db.json', 'utf8')
            var notes = JSON.parse(data);
            return notes;
        }
    
};