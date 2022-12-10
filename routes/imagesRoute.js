const express = require('express');

const router = express.Router();

const { imagesController } = require('../controllers');

router.route('/')
  .get(imagesController.persistImage);

// router.route('/persist-image/:id')
//   .get(imagesController.getOneBook)
//   .put(imagesController.updateBook)
//   .delete(imagesController.deleteBook);

module.exports = router;
