'use strict';

const express = require('express');
const morgan = require('morgan');
const moment = require('moment-timezone');
const cors = require('cors');
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');

const routes = require('./routes');

const { SERVER_PORT, CLIENT_ORIGIN, NODE_ENV } = require('./config');

const app = express();

morgan.token('date', (req, res, tz) => moment()
  .tz(tz)
  .format('h:mm:ss a')
);

app.use(
	morgan(
		'":method :url" :status :res[content-length] - :response-time ms [:date[America/Denver]]',
	)
);

app.use(
	cors({
		origin: CLIENT_ORIGIN,
	}),
);

app.use(express.json());

app.use(routes);

// ----------BEGIN AUTH0 STUFF---------------

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


// This route doesn't need authentication
app.get('/api/public', function(req, res) {
  res.json({
    message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
  });
});

// app.use(checkJwt);

// This route needs authentication
app.get('/api/private', checkJwt, function(req, res) {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated to see this.'
  });
});

const checkScopes = jwtAuthz([ 'read:books' ]);

app.get('/api/private-scoped', checkJwt, checkScopes, function(req, res) {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:books to see this.'
  });
});

app.get('/authorized', function (req, res) {
  res.send('Secured Resource');
});
// ----------END AUTH0 STUFF---------------

app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use((err, req, res, next) => {
	if (err.status) {
		const errBody = Object.assign({}, err, { message: err.message });
		res.status(err.status).json(errBody);
	} else {
		res.status(500).json({ message: 'Internal Server Error' });
		if (err.name !== 'FakeError') console.log(err);
	}
});

function runServer(port = SERVER_PORT) {
	const server = app
		.listen(port, () => {
			console.info(`App listening on port ${server.address().port}`);
		})
		.on('error', (err) => {
			console.error('Express failed to start');
			console.error(err);
		});
}

if (require.main === module) {
	runServer();
}

module.exports = app;