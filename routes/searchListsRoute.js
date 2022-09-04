const express = require('express');

const router = express.Router();

const { searchListsController } = require('../controllers');

router.route('/')
  .get(searchListsController.getSearchLists);

module.exports = router;
