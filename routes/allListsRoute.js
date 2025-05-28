const express = require('express');

const router = express.Router();

const { allListsController } = require('../controllers');

// Swagger documentation moved to /swagger/paths/allLists.json

router.route('/')
  .get(allListsController.getAllLists);

module.exports = router;
