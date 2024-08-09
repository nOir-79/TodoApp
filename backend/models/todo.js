const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    title: String,
    content: String,
    createdAt: {
        type: Date,
        default:Date.now()
    },
    updatedAt:{
        type: Date,
    },
    completed:{
        type: Boolean,
        default: false,
    },
    dueDate:{
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Todo',todoSchema)

