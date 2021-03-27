const pg = require('../db/pg');
const knex = require('../db/knex');

const { readingStatusTableFields } = require('../library/tableFields');
const {
  validateRequestBody,
  gatherTableUpdateableFields,
} = require('../utilities/requestBodyUtilities');

const updateableReadingStatusFields = gatherTableUpdateableFields(readingStatusTableFields);

// @desc Get all reading status'
// @route Get /api/reading_status
// @access Private
exports.getAllReadingStatus = async (req, res, next) => {
  try {
    const { rows } = await pg.query('SELECT * FROM reading_status');
    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};

// @desc Get a reading status
// @route Get /api/reading_status/:readingStatusId
// @access Private
exports.getOneReadingStatus = async (req, res, next) => {
  try {
    const { readingStatusId } = req.params;
    const { rows } = await pg.query('SELECT * FROM reading_status WHERE reading_status_id = $1', [readingStatusId]);
    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};

// @desc Create a reading status
// @route POST /api/reading_status/
// @access Private
exports.createOneReadingStatus = async (req, res, next) => {
  try {
    validateRequestBody(req, readingStatusTableFields, next);

    const newReadingStatus = {};

    Object.entries(req.body).forEach((field) => {
      const key = field[0];
      const value = field[1];
      newReadingStatus[key] = value;
    });

    knex
      .insert(newReadingStatus)
      .into('reading_status')
      .returning('*')
      .then((result) => {
        const results = result[0];
        res
          .status(201)
          .location(`${req.originalUrl}/${results.reading_status_id}`)
          .json(results);
      })
      .catch((error) => {
        next(error);
      });
  } catch (error) {
    next(error);
  }
};

// @desc Update a reading status
// @route Put /api/reading_status/:readingStatusId
// @access Private
exports.updateReadingStatus = (req, res, next) => {
  try {
    validateRequestBody(req, readingStatusTableFields, next);

    const { readingStatusId } = req.params;
    const toUpdate = {};

    updateableReadingStatusFields.forEach((field) => {
      if (field in req.body) {
        toUpdate[field] = req.body[field];
      }
    });

    toUpdate.modified_on = new Date(Date.now()).toISOString();

    knex('reading_status')
      .returning('*')
      .where({
        reading_status_id: readingStatusId,
      })
      .update(toUpdate)
      .then((results) => {
        const result = results[0];
        res
          .status(200)
          .location(`${req.originalUrl}/${result.reading_status_id}`)
          .json(result);
      })
      .catch((error) => {
        next(error);
      });
  } catch (error) {
    next(error);
  }
};

// @desc Delete a reading status
// @route Delete /api/reading_status/:readingStatusId
// @access Private
exports.deleteReadingStatus = async (req, res, next) => {
  try {
    const { readingStatusId } = req.params;

    // //CHECK TO MAKE SURE readingStatusId IS A NUMBER
    if (Number.isNaN(readingStatusId)) {
      const error = new Error('Invalid reading status id.');
      error.status = 400;
      return next(error);
    }

    const { rowCount } = await pg.query('DELETE FROM reading_status WHERE reading_status_id = $1', [readingStatusId]);
    if (rowCount === 1) {
      res
        .status(204)
        .json({ message: 'Reading status deleted.' });
    } else {
      const error = new Error(
        `Could not find a reading status with readingStatusId: ${readingStatusId}.`,
      );
      error.status = 406;
      return next(error);
    }
  } catch (error) {
    next(error);
  }
};
