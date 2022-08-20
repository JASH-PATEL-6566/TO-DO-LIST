const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TodoSchema = require('./todo');

const ListSchema = Schema({
    name: String,
    toDos: [TodoSchema]
})

const List = new mongoose.model('list', ListSchema);

module.exports = List;