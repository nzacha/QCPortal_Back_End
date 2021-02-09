const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')

/*
router.get('/', usersController.getUsers)
router.get('/myUsers/:id', usersController.getUsersOf)
router.post('/progress/:id', usersController.trackProgress)
router.get('/:id', usersController.findUser)
router.post('/', usersController.addUser)
router.delete('/:id', usersController.deactivateUser)
router.get('/activate/:id', usersController.activateUser)
router.delete('/delete/:id', usersController.removeUser)
router.patch('/:id', usersController.updateUser)
*/

module.exports = router