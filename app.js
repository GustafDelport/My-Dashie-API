require('dotenv').config()

const express = require('express');
var cors = require('cors');
const app = express();

app.use(cors());

const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', (e) => console.log(e));
db.on('open', () => console.log("Connected to the database"));

app.use(express.json());

require('./routes/bookmark-route')(app)
require('./routes/note-route')(app)
require('./routes/todo-route')(app)

app.listen(process.env.PORT, () => console.log(`http://localhost:${process.env.PORT}`))