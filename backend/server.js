require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const todoRoutes = require('./routes/actions_routes')
const authenticatinRoutes = require('./routes/authentication_routes')
const app = express()
app.use(express.json());

mongoose.connect("mongodb://localhost/todo")

app.use('/api',todoRoutes)
app.use('/authentication',authenticatinRoutes)

app.get('/',(req, res)=>{
    res.send("Hello")
})

app.listen(5000)



