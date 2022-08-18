const express = require('express');

const router = express.Router();

const { searchFavoritesController } = require('../controllers');

router.route('/')
  .get(searchFavoritesController.getSearchFavorites);

module.exports = router;
