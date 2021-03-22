'use strict';

const express = require('express');
const router = express.Router();

const { readingStatusController } = require('../controllers');

router.route('/')
  .get(readingStatusController.getAllReadingStatus)
  .post(readingStatusController.createOneReadingStatus);

router.route('/:bookId')
  .get(readingStatusController.getOneReadingStatus)
  .put(readingStatusController.updateReadingStatus)
  .delete(readingStatusController.deleteReadingStatus)

module.exports = router;