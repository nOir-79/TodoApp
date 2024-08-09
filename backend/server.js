const express = require("express")
const mongoose = require("mongoose")
const Todo = require("./models/todo")
const app = express()
app.use(express.json());

mongoose.connect("mongodb://localhost/todo")


app.put('/addItem',async (req, res)=>{
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
})

app.get('/getItem/:title', async (req, res)=>{
    try{
        console.log(decodeURIComponent(req.params.title))
        const todo = await Todo.find({title:decodeURIComponent(req.params.title)})
        res.send(todo)
    }catch(error){
        console.error(error)
    }
} )

app.delete('/deleteItem/:title',async(req,res)=>{
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
})
app.get('/',(req, res)=>{
    res.send("Hello")
})
app.listen(5000)



