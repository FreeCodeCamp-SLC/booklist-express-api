const pg = require('../db/pg');

// @desc Get all lists
// @route Get /api/lists
// @access Private
exports.getAllLists = async (req, res, next) => {
  try {
    const userId = req.user.sub;
    const { rows } = await pg.query('SELECT NAME, LIST_ID FROM lists WHERE user_id = $1', [userId]);
    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};
