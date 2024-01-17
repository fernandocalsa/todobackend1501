var express = require('express')
const { verifyToken } = require('../controllers/userController')
var router = express.Router()

taskController = require('../controllers/taskController')

router.get('/:taskId?', verifyToken, taskController.getTasks)

router.post('/', verifyToken, taskController.addTask)

router.delete('/:taskId', verifyToken, taskController.deleteTask)

router.put('/:taskId', verifyToken, taskController.updateTask)


module.exports = router