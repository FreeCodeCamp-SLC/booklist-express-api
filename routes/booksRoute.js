const express = require('express');

const router = express.Router();

const { booksController } = require('../controllers');

router.route('/')
  .get(booksController.getAllBooks)
  .post(booksController.createOneBook);

router.route('/:bookId')
  .get(booksController.getOneBook)
  .put(booksController.updateBook)
  .delete(booksController.deleteBook);

module.exports = router;
