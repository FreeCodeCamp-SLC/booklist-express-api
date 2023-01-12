const express = require('express');

const router = express.Router();

const { allListsController } = require('../controllers');

router.route('/')
  .get(allListsController.getAllLists);

module.exports = router;
