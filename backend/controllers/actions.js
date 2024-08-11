const Todo = require("../models/todo")
const mongoose = require("mongoose")

exports.addTodo = async (req, res)=>{
    try{
        console.log(req.body)
        const todo = new Todo(req.body.item)
        await todo.save();
        console.log('Item saved');
        res.sendStatus(200);
    }catch(err){
        console.error(err)
        res.sendStatus(500);
    }
}

exports.getTodo = async (req, res)=>{
    try{
        console.log(decodeURIComponent(req.params.title))
        const todo = await Todo.find({title:decodeURIComponent(req.params.title)})
        res.send(todo)
    }catch(error){
        console.error(error)
    }
}

exports.updateTodo = async(req,res)=>{
    try{
        const updatedTodo = await Todo.findOneAndUpdate(
            {'title':req.body.title},
            req.body.updatedTodo
        )

        if(!updatedTodo)
            return res.status(404).send('Item not found')

        res.json(updatedTodo);

    }catch(err){
        console.log(err)
        res.sendStatus(500);
    }
}

exports.deleteTodo = async(req,res)=>{
    try{
        const title = decodeURIComponent(req.params.title)
        console.log(title)
        const result = await Todo.findOneAndDelete({title:title})

        if(!result){
            return res.status(404).send('Item not found');
        }
        res.status(200).send('Item deleted')
    }catch(error){
        console.error(err)
    }
}