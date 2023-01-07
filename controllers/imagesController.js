const cloudinary = require('cloudinary').v2;
const pg = require('../db/pg');
const knex = require('../db/knex');

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

exports.postProfilePicture = async (request, response, next) => {
  await pg.query('TRUNCATE TABLE images');

  const userId = request.user.sub;
  const imageObj = { user_id: userId };

  Object.entries(request.body).forEach((field) => {
    const key = field[0];
    const value = field[1];
    imageObj[key] = value;
  });

  knex('images')
    .returning('*')
    .insert(
      imageObj,
    )
    .then((results) => {
      const result = results[0];
      console.log('result222', result);
      response
        .status(200)
        .location(`${request.oringalUrl}`)
        .json(result);
    })
    .catch((error) => {
      next(error);
    });
};

// need to have userID field in images table

exports.getProfilePicture = async (request, response, next) => {
  try {
    const userId = request.user.sub;
    const { rows } = await pg.query('SELECT IMAGE_URL FROM images WHERE user_id = $1', [userId]);
    response.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};
