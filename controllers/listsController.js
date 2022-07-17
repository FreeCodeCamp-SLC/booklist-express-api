const pg = require('../db/pg');
const knex = require('../db/knex');

const { listsTableFields } = require('../library/tableFields');
const {
  validateRequestBody,
  gatherTableUpdateableFields,
} = require('../utilities/requestBodyUtilities');

const updateableListFields = gatherTableUpdateableFields(listsTableFields);

// @desc Get all lists
// @route Get /api/lists
// @access Private
exports.getAllLists = async (req, res, next) => {
  try {
    let itemCount = 5;
    let pageNumber = 1;
    let sortBy = 'name';
    if (req.query.itemCount) {
      itemCount = req.query.itemCount;
    }
    if (req.query.pageNumber) {
      pageNumber = req.query.pageNumber;
    }
    const offset = (pageNumber - 1) * itemCount;
    if (req.query.sortBy) {
      sortBy = req.query.sortBy;
    }
    let _sortBy = req.query.sortBy;
    switch (sortBy) {
      case 'Title: Ascending':
        _sortBy = 'NAME ASC';
        break;
      case 'Title: Descending':
        _sortBy = 'NAME DESC';
        break;
      case 'Newest':
        _sortBy = 'LIST_ID ASC';
        break;
      case 'Oldest':
        _sortBy = 'LIST_ID DESC';
        break;
      case 'Year: Ascending':
        _sortBy = 'YEAR ASC';
        break;
      case 'Year: Descending':
        _sortBy = 'YEAR DESC';
        break;

      default:
        _sortBy = 'NAME ASC';
    }

    const userId = req.user.sub;
    const allRows = await pg.query('SELECT * FROM lists WHERE user_id = $1', [userId]);
    let { rows } = await pg.query(`SELECT * FROM lists WHERE user_id = $1 ORDER BY ${_sortBy} OFFSET ${offset} ROWS FETCH NEXT ${itemCount} ROWS ONLY`, [userId]);
    rows = [rows, { totalListCount: allRows.rows.length }];
    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};

// @desc Get a list
// @route Get /api/lists/:listId
// @access Private
exports.getOneList = async (req, res, next) => {
  try {
    const userId = req.user.sub;
    const { listId } = req.params;
    const { rows } = await pg.query('SELECT * FROM lists WHERE user_id = $1 AND list_id = $2', [userId, listId]);
    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};

// @desc Create a list
// @route POST /api/lists/
// @access Private
exports.createOneList = async (req, res, next) => {
  try {
    const error = validateRequestBody(req, listsTableFields, next);
    if (error instanceof Error) {
      return next(error);
    }

    const userId = req.user.sub;
    const newList = { user_id: userId };

    Object.entries(req.body).forEach((field) => {
      const key = field[0];
      const value = field[1];
      newList[key] = value;
    });

    knex
      .insert(newList)
      .into('lists')
      .returning('*')
      .then((result) => {
        const results = result[0];
        res
          .status(201)
          .location(`${req.originalUrl}/${results.list_id}`)
          .json(results);
      })
      .catch((error) => {
        next(error);
      });
  } catch (error) {
    next(error);
  }
};

// @desc Update a list
// @route Put /api/lists/:listId
// @access Private
exports.updateList = (req, res, next) => {
  try {
    const error = validateRequestBody(req, listsTableFields, next);
    if (error instanceof Error) {
      return next(error);
    }

    const userId = req.user.sub;
    const { listId } = req.params;
    const toUpdate = {};

    updateableListFields.forEach((field) => {
      if (field in req.body) {
        toUpdate[field] = req.body[field];
      }
    });

    toUpdate.modified_on = new Date(Date.now()).toISOString();

    knex('lists')
      .returning('*')
      .where({
        user_id: userId,
        list_id: listId,
      })
      .update(toUpdate)
      .then((results) => {
        const result = results[0];
        res
          .status(200)
          .location(`${req.originalUrl}/${result.list_id}`)
          .json(result);
      })
      .catch((error) => {
        next(error);
      });
  } catch (error) {
    next(error);
  }
};

// @desc Delete a list
// @route Delete /api/lists/:listId
// @access Private
exports.deleteList = async (req, res, next) => {
  try {
    const userId = req.user.sub;
    const { listId } = req.params;

    // //CHECK TO MAKE SURE listId IS A NUMBER
    if (Number.isNaN(listId)) {
      const error = new Error('Invalid list id.');
      error.status = 400;
      return next(error);
    }

    const { rowCount } = await pg.query('DELETE FROM lists WHERE list_id = $1 AND user_id = $2', [listId, userId]);
    if (rowCount === 1) {
      res
        .status(204)
        .json({ message: 'list deleted.' });
    } else {
      const error = new Error(
        `Could not find a list with listId: ${listId}.`,
      );
      error.status = 406;
      return next(error);
    }
  } catch (error) {
    next(error);
  }
};
