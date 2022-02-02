module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const todo = require('../models/todos')

    //Endpoints go here
    router.get('/get', async (req,res) => {
        try {
            const todos = await todo.find();
            res.status(200).json(todos);
    
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    })

    router.get('/get/:id', async (req, res) => {
        try {
            // const b = await bookmark.findById(req.params.id)
            const b = await todo.findById(req.params.id)

            if(b) res.status(200).json(b);
            else res.status(404).json({message: "You dumb Boi you"});

        } catch (err) {
            res.status(500).json({message: err.message})
        }
    })

    router.post('/add', async (req,res) => {
        try {
            const nwTodo = new todo({
                _id: req.body.id,
                text: req.body.text,
                completed: req.body.completed,
            })

            nwTodo.save();

            res.status(200).json({
                message: "Yes Boi",
                data: nwTodo 
            })
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    })

    router.put('/delete/:id', async (req, res) => {

        todo.findByIdAndDelete(req.params.id).then(b => {
            if (b) {res.status(200).json({message: "Yes"})}
            else res.status(404).json({message: "Does not exist"})
        }).catch(err => {
            res.status(500).json({
                message: err.message
            })
        })
    })

    router.patch('/update/:id', async (req, res) => {

        await todo.findByIdAndUpdate(req.params.id, req.body, {useFindAndModify: false}).then(b => {
            if (b) {
                res.status(200).json({
                    message: "todo details was updated"
                })
            } else {
                res.status(404).json({
                    message: "todo was not found"
                })
            }
        }).catch(error => {
            res.status(500).json({
                message: error.message
            })
        })
    })

    app.use('/todo',router)
}