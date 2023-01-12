const express = require('express');

const router = express.Router();

const { favoritesController } = require('../controllers');

router.route('/')
  .get(favoritesController.getAllFavorites);

module.exports = router;
