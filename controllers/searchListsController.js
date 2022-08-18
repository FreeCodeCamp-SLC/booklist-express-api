const pg = require('../db/pg');

exports.getSearchLists = async (req, res, next) => {
  try {
    const userId = req.user.sub;
    let sortBy = 'NAME';

    if (req.query.sortBy) {
      sortBy = req.query.sortBy;
    }
    let _sortBy = req.query.sortBy;
    switch (sortBy) {
      case 'Name: Asc':
        _sortBy = 'NAME ASC';
        break;
      case 'Name: Desc':
        _sortBy = 'NAME DESC';
        break;
      case 'Most Recent: Asc':
        _sortBy = 'LIST_ID ASC';
        break;
      case 'Most Recent: Desc':
        _sortBy = 'LIST_ID DESC';
        break;
      case 'Year: Asc':
        _sortBy = 'YEAR ASC';
        break;
      case 'Year: Desc':
        _sortBy = 'YEAR DESC';
        break;

      default:
        _sortBy = 'NAME ASC';
    }

    const { rows } = await pg.query(`SELECT * FROM lists WHERE USER_ID = $1 AND lower(NAME) LIKE lower('%${req.query.listQuery}%') ORDER BY ${_sortBy}`, [userId]);

    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};
