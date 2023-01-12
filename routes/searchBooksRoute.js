const express = require('express');

const router = express.Router();

const { searchBooksContoller } = require('../controllers');

router.route('/')
  .get(searchBooksContoller.getSearchBooks);

module.exports = router;
