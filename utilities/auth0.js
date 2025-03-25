const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
// const app = express();

const { AUTH0_JWKSURI, AUTH0_AUDIENCE, AUTH0_ISSUER } = require('../config');

const checkJwt = jwt({
  secret: jwks.expressJwtSecret({
    cache: false,
    rateLimit: true,
    // jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-jf644kce5ssvn2le.us.auth0.com/.well-known/jwks.json",
  }),
  // audience: AUTH0_AUDIENCE,
  audience: "https://dev-jf644kce5ssvn2le.us.auth0.com/api/v2",
  issuer: "https://dev-jf644kce5ssvn2le.us.auth0.com/",
  algorithms: ["RS256"],
});

// app.use((req, res, next) => {
//   console.log("JWT Validation Middleware");
//   console.log("Request Authorization Header:", req.headers["authorization"]);
//   next();
// });
// app.use(checkJwt);

// app.use((err, req, res, next) => {
// 	if (err.name === 'UnauthorizedError') {
// 		console.error("JWT Authentication Error", err.message)
// 	}
// 	next(err)
// })

// app.use(checkJwt)

module.exports = checkJwt;
