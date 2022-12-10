const cloudinary = require('cloudinary').v2;
const pg = require('../db/pg');
const knex = require('../db/knex');

exports.persistImage = async (request, response, next) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
    });
    const apiSecret = cloudinary.config().api_secret;
    console.log('apiSecret: ', apiSecret);

    //   const signUpload = async () => {
    //     const timestamp = Math.round((new Date()).getTime() / 1000);
    //     const params = {
    //       timestamp,
    //     };

    //     const signature = cloudinary.utils.api_sign_request(
    //       process.env.CLOUD_API_SECRET,
    //       params,
    //     );
    //     return { timestamp, signature };
    //   };

    const timestamp = Math.round((new Date()).getTime() / 1000);

    const signature = cloudinary.utils.api_sign_request({
      timestamp,
      // eager: 'c_pad,h_300,w_400|c_crop,h_200,w_260',
      folder: 'booklists',
      public_id: request.user.sub,
      overwrite: true,
      invalidate: true,
    }, apiSecret);

    // const signature = await signUpload();
    // console.log('signature', signature);
    response.status(200).json({ timestamp, signature });
  } catch (error) {
    next(error);
  }
};
