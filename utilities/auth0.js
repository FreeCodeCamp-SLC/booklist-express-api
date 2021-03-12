var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

const checkJwt = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://utahfcc.us.auth0.com/.well-known/jwks.json'
}),
  audience: 'https://booklist/api',
  issuer: 'https://utahfcc.us.auth0.com/',
  algorithms: ['RS256']
});

module.exports = checkJwt;
