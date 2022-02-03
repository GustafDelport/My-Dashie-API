module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const note = require('../models/notes')

    //Endpoints go here
    router.get('/get', async (req,res) => {
        try {
            const notes = await note.find();
            res.status(200).json(notes);
    
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    })

    router.get('/get/:id', async (req, res) => {
        try {
            const b = await note.findById(req.params.id)

            if(b) res.status(200).json(b);
            else res.status(404).json({message: "You dumb Boi you"});

        } catch (err) {
            res.status(500).json({message: err.message})
        }
    })

    router.post('/add', async (req,res) => {
        try {
            const nwNote = new note({
                _id: req.body._id,
                title: req.body.title,
                content: req.body.content,
            })

            nwNote.save();

            res.status(200).json({
                message: "Yes Boi",
                data: nwNote 
            })
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    })

    router.delete('/delete/:id', async (req, res) => {

        note.findByIdAndDelete(req.params.id).then(b => {
            if (b) {res.status(200).json({message: "Yes"})}
            else res.status(404).json({message: "Does not exist"})
        }).catch(err => {
            res.status(500).json({
                message: err.message
            })
        })
    })

    router.patch('/update/:id', async (req, res) => {

        await note.findByIdAndUpdate(req.params.id, req.body, {useFindAndModify: false}).then(b => {
            if (b) {
                res.status(200).json({
                    message: "note details was updated"
                })
            } else {
                res.status(404).json({
                    message: "note was not found"
                })
            }
        }).catch(error => {
            res.status(500).json({
                message: error.message
            })
        })
    })

    app.use('/note',router)
}