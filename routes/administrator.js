const express = require('express')
const router = express.Router()
const administratorController = require('../controllers/administratorController')

router.get('/', administratorController.getAdministrators)
router.get('/:id', administratorController.getAdministrator)
router.post('/', administratorController.addAdministrator)
router.delete('/:id', administratorController.removeAdministrator)
router.patch('/:id', administratorController.updateAdministrator)

module.exports = router