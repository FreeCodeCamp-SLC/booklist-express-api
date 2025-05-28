const express = require('express');

const router = express.Router();

const { booksByListController } = require('../controllers');

// Swagger documentation moved to /swagger/paths/booksByList.json

router.route('/')
  .get(booksByListController.getBooksByList);

module.exports = router;
