const express = require('express');

const router = express.Router();
const jwtAuthz = require('express-jwt-authz');

const { readingStatusController } = require('../controllers');

const checkAdminPermissions = jwtAuthz(['create:reading_status', 'edit:reading_status', 'delete:reading_status'], {
  customScopeKey: 'permissions',
  checkAllScopes: true,
});

router.route('/')
  .get(readingStatusController.getAllReadingStatus)
  .post(checkAdminPermissions, readingStatusController.createOneReadingStatus);

router.route('/:readingStatusId')
  .get(readingStatusController.getOneReadingStatus)
  .put(checkAdminPermissions, readingStatusController.updateReadingStatus)
  .delete(checkAdminPermissions, readingStatusController.deleteReadingStatus);

module.exports = router;
