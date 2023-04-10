const api = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, writeToFile, } = require('../helpers/fsUtils');

api.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) =>
        res.json(JSON.parse(data))
    );
});

api.get('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.id === noteId);
            return result.length > 0
                ? res.json(result)
                : res.json('No note with that ID');
        });
});

api.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {

            const result = json.filter((note) => note.id !== noteId);



            writeToFile('./db/db.json', result);


            res.json(result);

        });
});

api.post('/', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    const newNote = {

        id: uuidv4(),
        title, text
    };


    const parsedData = readAndAppend(newNote, './db/db.json');
    res.json(parsedData);

});

module.exports = api;