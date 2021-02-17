const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')


router.get('/', usersController.getUsers)
router.post('/', usersController.addUser)
router.delete('/:id', usersController.removeUser)
router.patch('/:id', usersController.updateUser)

module.exports = router