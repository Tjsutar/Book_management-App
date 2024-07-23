const express = require('express');
const router = express.Router();

router.use('/api', require('./bookRoutes'));

module.exports = router;
