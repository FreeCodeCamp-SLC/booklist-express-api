const pg = require('../db/pg');
const { sort } = require('../utilities/sort');

exports.getSearchLists = async (req, res, next) => {
  try {
    const userId = req.user.sub;

    const sortBy = sort(req.query.sortBy, true);

    const { rows } = await pg.query(`SELECT * FROM lists WHERE USER_ID = $1 AND lower(NAME) LIKE lower('%${req.query.listQuery}%') ORDER BY ${sortBy}`, [userId]);

    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};
