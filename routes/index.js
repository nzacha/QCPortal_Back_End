var express = require('express')
var router = express.Router();

router.use('/users', require('./users'));
router.use('/projects', require('./projects'));
router.use('/administrators', require('./administrator'));
router.use('/data', require('./data'));
router.use('/categories', require('./categories'));
router.use('/disciplines', require('./disciplines'));
router.use('/authenticate', require('./authentication'));

module.exports = router