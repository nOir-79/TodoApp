const express = require("express")
const router = express.Router()
const todoController = require('../controllers/actions')

router.put('/addItem',todoController.addTodo)

router.put('/updateItem',todoController.updateTodo)

router.get('/getItem/:title',todoController.getTodo)

router.delete('/deleteItem/:title',todoController.deleteTodo)

module.exports = router;
