const cloudinary = require('cloudinary').v2;
const pg = require('../db/pg');
const knex = require('../db/knex');

const { profilesTableFields } = require('../library/tableFields');
const {
  validateRequestBody,
  gatherTableUpdateableFields,
} = require('../utilities/requestBodyUtilities');

const updateableProfileFields = gatherTableUpdateableFields(profilesTableFields);

exports.getProfiles = async (req, res, next) => {
  try {
    const userId = req.user.sub;
    const { rows } = await pg.query('SELECT * FROM profiles WHERE user_id = $1', [userId]);
    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};

exports.postProfile = async (req, res, next) => {
  const error = validateRequestBody(req, profilesTableFields, next);
  if (error instanceof Error) {
    return next(error);
  }
  const userId = req.user.sub;
  const profileObj = { user_id: userId };

  Object.entries(req.body).forEach((field) => {
    const key = field[0];
    const value = field[1];
    profileObj[key] = value;
  });

  knex
    .insert(profileObj)
    .into('profiles')
    .returning('*')
    .then((result) => {
      const results = result[0];
      res
        .status(201)
        .location(`${req.originalUrl}/`)
        .json(results);
    })
    .catch((err) => {
      next(err);
    });
};

exports.putProfile = async (req, res, next) => {
  try {
    const error = validateRequestBody(req, profilesTableFields, next);
    if (error instanceof Error) {
      return next(error);
    }

    const userId = req.user.sub;
    const toUpdate = {};

    updateableProfileFields.forEach((field) => {
      if (field in req.body) {
        toUpdate[field] = req.body[field];
      }
    });

    knex('profiles')
      .returning('*')
      .where({
        user_id: userId,
      })
      .update(toUpdate)
      .then((results) => {
        const result = results[0];
        res
          .status(200)
          .location(`${req.originalUrl}/`)
          .json(result);
      });
  } catch (error) {
    next(error);
  }
};

exports.generateSignature = async (request, response, next) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
    });
    const apiSecret = cloudinary.config().api_secret;
    const timestamp = Math.round((new Date()).getTime() / 1000);

    const signature = cloudinary.utils.api_sign_request({
      timestamp,
      folder: 'booklists',
      public_id: request.user.sub,
      overwrite: true,
      invalidate: true,
    }, apiSecret);

    response.status(200).json({ timestamp, signature });
  } catch (error) {
    next(error);
  }
};
