const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StateSchema = Schema({
    active: Schema.Types.ObjectId,
    list: [{
        type: Schema.Types.ObjectId,
        ref: 'list'
    }]
})

const State = new mongoose.model('state', StateSchema);

module.exports = State;