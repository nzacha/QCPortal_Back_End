var express = require('express')
var router = express.Router();

router.use('/users', require('./users'));
router.use('/authentication', require('./authentication'));
router.use('/data', require('./data'));
router.use('/administrator', require('./administrator'));
router.use('/projects', require('./projects'));

module.exports = router