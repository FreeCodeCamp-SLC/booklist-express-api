const express = require('express');

const router = express.Router();

const { listsController } = require('../controllers');

router.route('/')
  .get(listsController.getAllLists)
  .post(listsController.createOneList);

router.route('/:listId')
  .get(listsController.getOneList)
  .put(listsController.updateList)
  .delete(listsController.deleteList);

module.exports = router;
