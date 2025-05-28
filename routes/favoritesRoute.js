const express = require('express');

const router = express.Router();

const { favoritesController } = require('../controllers');

// Swagger documentation moved to /swagger/paths/favorites.json

router.route('/')
  .get(favoritesController.getAllFavorites);

module.exports = router;
