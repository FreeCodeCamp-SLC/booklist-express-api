const express = require('express');

const router = express.Router();

const { searchFavoritesController } = require('../controllers');

// Swagger documentation moved to /swagger/paths/searchFavorites.json

router.route('/')
  .get(searchFavoritesController.getSearchFavorites);

module.exports = router;
