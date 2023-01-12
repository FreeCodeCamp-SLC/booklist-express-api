const express = require('express');

const router = express.Router();

const { booksByListController } = require('../controllers');

router.route('/')
  .get(booksByListController.getBooksByList);

module.exports = router;
