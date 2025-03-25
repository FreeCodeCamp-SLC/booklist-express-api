const express = require('express');
const morgan = require('morgan');
const { format } = require('date-fns');
const cors = require('cors');
const authenticateJWT = require("./utilities/authenticateJWT");
const swaggerUi = require("swagger-ui-express")
const swaggerConfig = require("./swaggerConfig")
const checkJwt = require("./utilities/auth0");

const routes = require('./routes');

const { SERVER_PORT, CLIENT_ORIGIN } = require('./config');

const app = express();

morgan.token('date', () => format(new Date(), 'h:mm:ss a'));

app.use(
  morgan(
    '":method :url" :status :res[content-length] - :response-time ms [:date[America/Denver]]',
  ),
);

// app.use(
//   cors({
//     origin: false,
//   }),
// );

app.use(
  cors({    
		origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow the methods your frontend will use
    allowedHeaders: ["Content-Type", "Authorization"], // Specify headers if needed
  })
);

app.use(express.json());

app.use(authenticateJWT)

app.use(routes);

app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig))

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, _next) => {
  if (err.status) {
    const errBody = { ...err, message: err.message };
    res.status(err.status).json(errBody);
  } else {
		console.error("There was an error")
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
