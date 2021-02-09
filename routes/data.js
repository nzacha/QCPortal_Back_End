const express = require('express')
const router = express.Router()
const answersController = require('../controllers/answersController')

/*
router.get('/', answersController.getAllAnswers)
router.get('/:code/:projectId', answersController.getAnswersOf)
router.post('/:questionId/:userId', answersController.addAnswer)
router.delete('/:id', answersController.removeAnswer)
*/

module.exports = router