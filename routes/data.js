const express = require('express')
const router = express.Router()
const dataController = require('../controllers/dataController')

router.get('/', dataController.getAllData)
router.get('/project/:projectId', dataController.getDataOfProject)
//router.get('/category/:categoryId', dataController.getDataOfCategory)
//router.get('/discipline/:disciplineId', dataController.getDataOfDiscipline)
//router.post('/create?projectId&disciplineId', dataController.addData)
router.post('/:projectId/:disciplineId', dataController.addData)
router.delete('/:id', dataController.removeData)

module.exports = router