require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Todo = require("./models/todo")
const User = require("./models/user")
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

app.post('/register', async (req, res)=>{
    try{
        const {username,password,email} = req.body
        const user = new User({username,password,email})

        await user.save();
        res.status(201).send('User registered successfully')
    }catch(err){
        console.error(err)
        res.status(400).send('Error registering user')
    }
})

app.post('/login', async (req,res)=>{
    try {
        console.log("access token:")
        console.log(process.env.ACCESS_TOKEN_SECRET)
        const {username,password} = req.body
        console.log(username)
        console.log(password)
        const user = await User.findOne({username})
        console.log(user)
        if(!user || !await bcrypt.compare(password, user.password))
        {
            return res.status(401).send('Invalid credentials');
        }

        const token = jwt.sign({user:user},process.env.ACCESS_TOKEN_SECRET)
        res.json({token})
    }catch(err){
        console.error(err)
        res.status(500).send('Error loggin ing')
    }
})

app.put('/updateItem',async(req,res)=>{
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



