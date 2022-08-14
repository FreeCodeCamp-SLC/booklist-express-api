const pg = require('../db/pg');

// @desc Get all favorites
// @route Get /api/favorites
// @access Private
exports.getAllLists = async (req, res, next) => {
  try {
    const userId = req.user.sub;
    const { rows } = await pg.query('* FROM BOOKS WHERE user_id = $1 AND bool_and ( favorites ) ', [userId]);
    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};
