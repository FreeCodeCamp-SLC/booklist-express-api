const express = require('express');

const router = express.Router();

const { imagesController } = require('../controllers');

router.route('/')
  .get(imagesController.getProfilePicture)
  .post(imagesController.postProfilePicture);

router.route('/generateSignature')
  .get(imagesController.generateSignature);

module.exports = router;
