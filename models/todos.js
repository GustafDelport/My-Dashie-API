const mongoose = require('mongoose');

const todosSchema = mongoose.Schema({
    _id: {
        type: String,
    },
    text: {
        type: String
    },
    completed: {
        type: Boolean 
    }
})

const todos = mongoose.model('Todos', todosSchema)

module.exports = todos