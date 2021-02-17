const express = require('express')
const router = express.Router()
const authenticationController = require('../controllers/authenticationController')

router.post('/', authenticationController.authenticate)
router.post('/admin/', authenticationController.authenticateAdmin)
router.post('/user/', authenticationController.authenticateUser)

module.exports = router