const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const { AUTH0_JWKSURI, AUTH0_AUDIENCE, AUTH0_ISSUER } = require('../config');

const checkJwt = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: AUTH0_JWKSURI,
  }),
  audience: AUTH0_AUDIENCE,
  issuer: AUTH0_ISSUER,
  algorithms: ['RS256'],
});

module.exports = checkJwt;
