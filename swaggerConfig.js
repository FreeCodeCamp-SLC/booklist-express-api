const fs = require('fs');
const path = require('path');

// Base Swagger document
const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Utah FCC',
    version: '1.0.0',
    description: 'API documentation for the Utah FCC Booklist app project',
  },
  servers: [
    {
      url: 'http://localhost:8080',
    },
  ],
  paths: {},
};

// Path to the directory containing JSON files
const pathsDir = path.join(__dirname, 'swagger', 'paths');

// Read all JSON files in the swagger/paths directory
if (fs.existsSync(pathsDir)) {
  const files = fs.readdirSync(pathsDir);

  // Process each JSON file
  files.forEach((file) => {
    if (path.extname(file) === '.json') {
      const filePath = path.join(pathsDir, file);
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        const pathsObject = JSON.parse(content);

        // Merge paths into the main Swagger spec
        Object.assign(swaggerSpec.paths, pathsObject);
      } catch (error) {
        console.error(`Error processing ${file}:`, error.message);
      }
    }
  });
}

module.exports = swaggerSpec;
