const swaggerJsdoc = require("swagger-jsdoc")

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Utah FCC",
      version: "1.0.0",
      description: "API documentation for the Utah FCC Booklist app project",
    },
    servers: [
      {
        url: "http://localhost:8080", // Replace with your server URL
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to your TypeScript route files
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
