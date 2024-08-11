const User = require("../models/user")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require("mongoose")

exports.registration = async (req, res)=>{
    try{
        const {username,password,email} = req.body
        const user = new User({username,password,email})

        await user.save();
        res.status(201).send('User registered successfully')
    }catch(err){
        console.error(err)
        res.status(400).send('Error registering user')
    }
}

exports.login = async (req,res)=>{
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
}