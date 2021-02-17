const express = require('express')
const router = express.Router()
const projectController = require('../controllers/projectController')

router.get('/', projectController.getProjects)
router.get('/:id', projectController.getProject)
router.post('/', projectController.addProject)
router.delete('/:id', projectController.deleteProject)
router.post('/link/:id/:administratorId', projectController.linkProject)
router.delete('/link/:id/:administratorId', projectController.deleteLink)

module.exports = router