const pg = require('../db/pg');
const knex = require('../db/knex');

const { booksTableFields } = require('../library/tableFields');
const {
  validateRequestBody,
  gatherTableUpdateableFields,
} = require('../utilities/requestBodyUtilities');

const updateableBooksFields = gatherTableUpdateableFields(booksTableFields);

// @desc Get all books
// @route Get /api/books
// @access Private

exports.getAllBooks = async (req, res, next) => {
  try {
    const userId = req.user.sub;
    const { allBooks } = req.query;
    if (allBooks) {
      try {
        const { rows } = await pg.query('SELECT * FROM books LEFT JOIN reading_status ON reading_status.reading_status_id = books.reading_status_id WHERE user_id = $1', [userId]);
        res.status(200).json(rows);
      } catch (error) {
        next(error);
      }
      return;
    }
    let booksItemCount = 10;
    let pageNumber = 1;
    let sortBy = 'TITLE';
    if (req.query.booksItemCount) {
      booksItemCount = req.query.booksItemCount;
    }
    if (req.query.pageNumber) {
      pageNumber = req.query.pageNumber;
    }
    const offset = (pageNumber - 1) * booksItemCount;
    if (req.query.sortBy) {
      sortBy = req.query.sortBy;
    }
    let _sortBy = req.query.sortBy;
    switch (sortBy) {
      case 'Name: Asc':
        _sortBy = 'TITLE ASC';
        break;
      case 'Name: Desc':
        _sortBy = 'TITLE DESC';
        break;
      case 'Most Recent: Asc':
        _sortBy = 'BOOK_ID ASC';
        break;
      case 'Most Recent: Desc':
        _sortBy = 'Book_ID DESC';
        break;

      default:
        _sortBy = 'TITLE ASC';
    }

    const allRows = await pg.query('SELECT * FROM books LEFT JOIN reading_status ON reading_status.reading_status_id = books.reading_status_id WHERE user_id = $1', [userId]);
    let { rows } = await pg.query(`SELECT * FROM books LEFT JOIN reading_status ON reading_status.reading_status_id = books.
    reading_status_id WHERE user_id = $1 ORDER BY ${_sortBy}  OFFSET ${offset} ROWS FETCH NEXT ${booksItemCount} ROWS ONLY`, [userId]);
    rows = [rows, { totalBookCount: allRows.rows.length }];
    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};

// @desc Get a book
// @route Get /api/books/:bookId
// @access Private
exports.getOneBook = async (req, res, next) => {
  try {
    const userId = req.user.sub;
    const { bookId } = req.params;
    const { rows } = await pg.query('SELECT * FROM books LEFT JOIN reading_status ON reading_status.reading_status_id = books.reading_status_id WHERE user_id = $1 AND book_id = $2', [userId, bookId]);
    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};

// @desc Create a book
// @route POST /api/books/
// @access Private
exports.createOneBook = async (req, res, next) => {
  try {
    const error = validateRequestBody(req, booksTableFields, next);
    if (error instanceof Error) {
      return next(error);
    }

    const userId = req.user.sub;
    const newBook = { user_id: userId };

    Object.entries(req.body).forEach((field) => {
      const key = field[0];
      const value = field[1];
      newBook[key] = value;
    });

    knex
      .insert(newBook)
      .into('books')
      .returning('*')
      .then((result) => {
        const results = result[0];
        res
          .status(201)
          .location(`${req.originalUrl}/${results.book_id}`)
          .json(results);
      })
      .catch((error) => {
        next(error);
      });
  } catch (error) {
    next(error);
  }
};

// @desc Update a book
// @route Put /api/books/:bookId
// @access Private
exports.updateBook = (req, res, next) => {
  try {
    const error = validateRequestBody(req, booksTableFields, next);
    if (error instanceof Error) {
      return next(error);
    }

    const userId = req.user.sub;
    const { bookId } = req.params;
    const toUpdate = {};

    updateableBooksFields.forEach((field) => {
      if (field in req.body) {
        toUpdate[field] = req.body[field];
      }
    });

    toUpdate.modified_on = new Date(Date.now()).toISOString();

    knex('books')
      .returning('*')
      .where({
        user_id: userId,
        book_id: bookId,
      })
      .update(toUpdate)
      .then((results) => {
        const result = results[0];
        res
          .status(200)
          .location(`${req.originalUrl}/${result.book_id}`)
          .json(result);
      })
      .catch((error) => {
        next(error);
      });
  } catch (error) {
    next(error);
  }
};

// @desc Delete a book
// @route Delete /api/books/:bookId
// @access Private
exports.deleteBook = async (req, res, next) => {
  try {
    const userId = req.user.sub;
    const { bookId } = req.params;

    // //CHECK TO MAKE SURE bookId IS A NUMBER
    if (Number.isNaN(bookId)) {
      const error = new Error('Invalid book id.');
      error.status = 400;
      return next(error);
    }

    const { rowCount } = await pg.query('DELETE FROM books WHERE user_id = $1 AND book_id = $2', [userId, bookId]);
    if (rowCount === 1) {
      res
        .status(204)
        .json({ message: 'book deleted.' });
    } else {
      const error = new Error(
        `Could not find a book with bookId: ${bookId}.`,
      );
      error.status = 406;
      return next(error);
    }
  } catch (error) {
    next(error);
  }
};
