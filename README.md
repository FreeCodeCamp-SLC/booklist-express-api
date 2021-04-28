# Booklist API

## Description

This is the API for the booklist app, this is built to be the backend for any front end application like React, Vue, etc...

## Installation and Setup

1. Clone the project down and run npm install to install node modules.
1. Setup PostgreSQL on your pc.

   1. Download PostgreSQL from [here](https://www.postgresql.org/download/), version number shouldn't matter.
   1. Install PostgreSQL with all the default settings, remember the password you chose while installing.
   1. After PostgreSQL is done installing, run pgAdmin, it will ask for the password you set while installing.
   1. Once pgAdmin is running in your browser, expand servers and then PostgreSQL on the left side, right click database and select create > database, you will need a database called 'booklist', go ahead and create another database called 'booklist_test' in case you ever get into writing backend tests.

1. Create a .env file in the root of this project, we will be putting your local database password env variable here. There is also 3 other key/value pairs you'll need here, message Alex Puhl on the UtahJS Slack to get this.

   1. DB_PASSWORD=yourPassword
   2. AUTH0_JWKSURI=MESSAGE_ALEX_FOR_VALUE
   3. AUTH0_AUDIENCE=MESSAGE_ALEX_FOR_VALUE
   4. AUTH0_ISSUER=MESSAGE_ALEX_FOR_VALUE

1. We will be using Knex to setup the tables and seed some data, we will need to install knex globally if you don't have it already.
   1. You can check what packages are globally installed on your PC with [npm list -g --depth 0]
   1. Install knex globally with [npm i -g knex]
   1. cd into the /db folder
   1. Run the command [knex migrate:latest] to create the database tables for booklist
   1. Run the command [knex seed:run] to seed the tables with seed data.

## Available Scripts

### `npm start`

Runs the app in whatever mode NODE_ENV is set to, by default that should be 'development'.

## Setup Postman

Postman is a useful tool for API development, we can use it to test sending REST requests to the server without a front end client.

1. Download [postman](https://www.postman.com/downloads/) and install it.
2. You can create a postman account if you want. This will allow you to then install postman on another pc and when you login all your saved network requests will download to that pc.
3. We have a file in the root of this project called Booklists.postman_collection.json, we will want to import this into postman by clicking on File > Import from within Postman. Find the file Booklists.postman_collection.json from inside this project.
4. You should now have all the api requests inside a folder called Booklists with the subfolders List Route, Book Route, Reading Status Route.
