const express = require('express');

const router = express.Router();

const { searchListsController } = require('../controllers');

// Swagger documentation moved to /swagger/paths/searchLists.json

router.route('/')
  .get(searchListsController.getSearchLists);

module.exports = router;
