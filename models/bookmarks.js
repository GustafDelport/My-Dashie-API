const mongoose = require('mongoose');

const bookmarksSchema = mongoose.Schema({
    _id: {
        type: String,
    },
    name: {
        type: String
    },
    url: {
        type: String,
        required: true
    }
})

const bookmarks = mongoose.model('bookmarks', bookmarksSchema)

module.exports = bookmarks