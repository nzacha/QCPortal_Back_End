const express = require('express')
const router = express.Router()
const disciplineController = require('../controllers/disciplineController')

router.get('/', disciplineController.getAllDisciplines)
router.get('/:id', disciplineController.getDiscipline)
router.post('/:categoryId', disciplineController.addDiscipline)
router.delete('/:id', disciplineController.deleteDiscipline)

module.exports = router