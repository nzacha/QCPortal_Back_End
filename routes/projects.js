const express = require('express')
const router = express.Router()
const projectController = require('../controllers/projectController')

/*
router.get('/', projectController.getProjects)
router.get('/:id', projectController.getProject)
router.post('/', projectController.addProject)
router.patch('/:id', projectController.updateProject)
router.delete('/:id', projectController.deleteProject)
router.post('/link/:id/:researcherId', projectController.linkProject)
router.delete('/link/:id/:researcherId', projectController.deleteLink)
*/

module.exports = router