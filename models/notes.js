const mongoose = require('mongoose');

const notesSchema = mongoose.Schema({
    _id: {
        type: String,
    },
    title: {
        type: String,
        required : true
    },
    content: {
        type: String
    }
})

const notes = mongoose.model('Notes', notesSchema)

module.exports = notes