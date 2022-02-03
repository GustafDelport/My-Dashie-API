// const bookmarks = require('../models/bookmarks')

module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const bookmark = require('../models/bookmarks')

    //Endpoints go here
    router.get('/get', async (req,res) => {
        try {
            const bookmarks = await bookmark.find();
            res.status(200).json(bookmarks);
    
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    })

    router.get('/get/:id', async (req, res) => {
        try {
            // const b = await bookmark.findById(req.params.id)
            const b = await bookmark.findById(req.params.id)

            if(b) res.status(200).json(b);
            else res.status(404).json({message: "You dumb Boi you"});

        } catch (err) {
            res.status(500).json({message: err.message})
        }
    })

    router.post('/add', async (req,res) => {
        try {
            const nwBookmark = new bookmark({
                _id: req.body._id,
                name: req.body.name,
                url: req.body.url,
            })
            
            nwBookmark.save();

            res.status(200).json({
                message: "Yes Boi",
                data: nwBookmark 
            })
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    })

    router.delete('/delete/:id', async (req, res) => {

        bookmark.findByIdAndDelete(req.params.id).then(b => {
            if (b) {res.status(200).json({message: "Yes"})}
            else res.status(404).json({message: "Does not exist"})
        }).catch(err => {
            res.status(500).json({
                message: err.message
            })
        })
    })

    router.patch('/update/:id', async (req, res) => {

        await bookmark.findByIdAndUpdate(req.params.id, req.body, {useFindAndModify: false}).then(b => {
            if (b) {
                res.status(200).json({
                    message: "bookmark details was updated"
                })
            } else {
                res.status(404).json({
                    message: "bookmark was not found"
                })
            }
        }).catch(error => {
            res.status(500).json({
                message: error.message
            })
        })
    })

    app.use('/bookmark',router)
}