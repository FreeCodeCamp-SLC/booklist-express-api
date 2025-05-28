const express = require('express');

const router = express.Router();

const { helloController } = require('../controllers');

// Swagger documentation moved to /swagger/paths/hello.json

router.route('/').get(helloController.hello);

module.exports = router;
