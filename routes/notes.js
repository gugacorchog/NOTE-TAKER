const router = require('express').Router();
const path = require('path');
const uuid = require('../helpers/uuid');
const { writeToFile, readFromFile } = require('../helpers/files');

// GET Route 
router.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route 
router.post('/notes', (req, res) => {
    readFromFile("./db/db.json", {encoding: "utf-8"}, (err, data) => {
        if (err) {
            console.log("Error writing file");
            res.status(500);
        } else {
            let dataBase = JSON.parse(data);
            let newNote = req.body
            newNote.id = uuid();
            dataBase.push(newNote);
            console.log(req.body);
            writeToFile('./db/db.json', dataBase);
            res.json(dataBase);
        }
    });
});

// DELETE Route
router.delete('/notes/:id', function(req, res){
    readFromFile("./db/db.json", {encoding: "utf-8"}, (err, data) => {
        if (err){
            console.log("Error deleting file");
            res.status(500);
        } else {
            let dataBase = JSON.parse(data);
            let noteId = req.params.id;
            let deleteIndex =  dataBase.findIndex((note) => {
                return note.id === noteId;
            });
            dataBase.splice(deleteIndex, 1);
            writeToFile("./db/db.json", dataBase);
            res.json(dataBase);
        }
    });
});

module.exports = router;