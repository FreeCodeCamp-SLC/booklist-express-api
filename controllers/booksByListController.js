const pg = require('../db/pg');

// @desc Get all books
// @route Get /api/books
// @access Private

exports.getBooksByList = async (req, res, next) => {
  try {
    const userId = req.user.sub;
    const { listIds } = req.query;
    console.log('listIds', listIds);
    const { rows } = await pg.query(`SELECT * FROM books LEFT JOIN reading_status ON reading_status.reading_status_id = books.reading_status_id WHERE user_id = $1 and list_id in (${listIds}) `, [userId]);

    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};
