const pg = require('../db/pg');

exports.getSearchBooks = async (req, res, next) => {
  console.log('req.query.bookQuery', req.query.bookQuery);
  try {
    const userId = req.user.sub;
    let sortBy = 'TITLE';

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
    // idea: implement sorting
    // then on front end have toggle for 2nd booklist with search results that gets toggled after 3rd character is entered
    // untoggle back to normal booklist after dashboard is clicked or navigated to
    // do for lists and favorites too.

    const allRows = await pg.query('SELECT * FROM books WHERE user_id = $1', [userId]);

    let { rows } = await pg.query(`SELECT * FROM BOOKS WHERE USER_ID = $1 AND lower(TITLE) LIKE lower('%${req.query.bookQuery}%') ORDER BY ${_sortBy}`, [userId]);

    rows = [rows, { totalBookCount: allRows.rows }];

    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};
