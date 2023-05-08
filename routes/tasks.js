var express = require('express')
var router = express.Router()

taskController = require('../controllers/taskController')

router.get('/', taskController.getTasks)

module.exports = router