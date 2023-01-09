const express = require('express');

const router = express.Router();

const { profileController } = require('../controllers');

router.route('/')
  .get(profileController.getProfiles)
  .post(profileController.postProfile)
  .put(profileController.putProfile);

router.route('/generateSignature')
  .get(profileController.generateSignature);

module.exports = router;
