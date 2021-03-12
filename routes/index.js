'use strict';

const express = require('express');
const router = express.Router();

const checkJwt = require('../utilities/auth0');

router.use('/api/lists', checkJwt, require('./listsRoute'));
// router.use('/api/books', checkJwt, require('./booksRoute'));
// router.use('/api/reading_status', checkJwt, require('./readingStatusRoute'));

module.exports = router;