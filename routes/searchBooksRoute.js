const express = require('express');

const router = express.Router();

const { searchBooksContoller } = require('../controllers');

// Swagger documentation moved to /swagger/paths/searchBooks.json

router.route('/')
  .get(searchBooksContoller.getSearchBooks);

module.exports = router;
