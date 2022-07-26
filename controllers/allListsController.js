const pg = require('../db/pg');

// @desc Get all lists
// @route Get /api/lists
// @access Private
exports.getAllLists = async (req, res, next) => {
// need to make a all lists controller because we need every list for the add a book dropdown.

  try {
    const userId = req.user.sub;
    const { rows } = await pg.query('SELECT NAME, LIST_ID FROM lists WHERE user_id = $1', [userId]);
    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};
