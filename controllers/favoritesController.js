const pg = require('../db/pg');

// @desc Get all favorites
// @route Get /api/favorites
// @access Private
exports.getAllFavorites = async (req, res, next) => {
  try {
    const userId = req.user.sub;
    // make this sorting/pagination logic into a helper function later
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
    const allRows = await pg.query('SELECT * FROM books WHERE user_id = $1 AND FAVORITE = true', [userId]);

    let { rows } = await pg.query(`SELECT * FROM BOOKS WHERE user_id = $1 AND FAVORITE = true ORDER BY ${_sortBy}  OFFSET ${offset} ROWS FETCH NEXT ${booksItemCount} ROWS ONLY`, [userId]);
    rows = [rows, { totalBookCount: allRows.rows.length }];

    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};
