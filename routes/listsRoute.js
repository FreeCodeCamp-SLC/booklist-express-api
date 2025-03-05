const express = require('express');

const router = express.Router();

const { listsController } = require('../controllers');

/**
 * @swagger
 * /lists:
 *   get:
 *     summary: Get all lists
 *     description: Retrieves a list of lists along with the total count of lists. Uses the `listsController.getAllLists` function.
 *     operationId: getAllLists
 *     tags:
 *       - Lists
 *     responses:
 *       200:
 *         description: A list of lists with the total count
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 oneOf:
 *                   - type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         list_id:
 *                           type: integer
 *                           description: The unique ID of the list
 *                           example: 1
 *                         user_id:
 *                           type: string
 *                           description: The user ID of the list owner
 *                           example: "google-oauth2|117717101958145567060"
 *                         name:
 *                           type: string
 *                           description: The name of the list
 *                           example: "Non-Fiction"
 *                         year:
 *                           type: integer
 *                           description: The year of the list
 *                           example: 2021
 *                         created_on:
 *                           type: string
 *                           format: date-time
 *                           description: The timestamp when the list was created
 *                           example: "2025-02-24T01:44:03.301Z"
 *                         modified_on:
 *                           type: string
 *                           format: date-time
 *                           description: The timestamp when the list was last modified
 *                           example: "2025-02-24T01:44:17.040Z"
 *                   - type: object
 *                     properties:
 *                       totalListCount:
 *                         type: integer
 *                         description: The total number of lists
 *                         example: 1
 *   post:
 *     summary: POST request to create a list
 *     description: POST request to create a list
 *     operationId: createOneList
 *     tags:
 *       - Lists
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the list
 *                 example: "Non-fiction"
 *               year:
 *                 type: number
 *                 description: Year for the list
 *                 example: 2021
 *     responses:
 *       201:
 *         description: A successful creation of a list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 list_id:
 *                   type: number
 *                   description: id for list
 *                 user_id:
 *                   type: string
 *                 name:
 *                   type: string
 *                   description: of the list
 *                 year:
 *                   type: number
 *                   description: Year of the list
 *                 created_on:
 *                   type: string
 *                   description: string timestamp
 *                 modified_on:
 *                   type: string
 *                   description: string timestamp
 * /lists/{listId}:
 *   get:
 *     summary: Retrieve a specific list by id
 *     description: Endpoint to retrieve a specific list by id
 *     operationId: getOneList
 *     tags:
 *       - Lists
 *     parameters:
 *       - name: listId
 *         in: path
 *         required: true
 *         description: The ID of the list to retrieve
 *         schema:
 *           type: number
 *           example: 1
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   list_id:
 *                     type: integer
 *                     description: The unique ID of the list
 *                     example: 1
 *                   user_id:
 *                     type: string
 *                     description: The user ID of the list owner
 *                     example: "google-oauth2|117717101958145567060"
 *                   name:
 *                     type: string
 *                     description: The name of the list
 *                     example: "Non-Fiction"
 *                   year:
 *                     type: integer
 *                     description: The year of the list
 *                     example: 2021
 *                   created_on:
 *                     type: string
 *                     format: date-time
 *                     description: The timestamp when the list was created
 *                     example: "2025-02-24T01:44:03.301Z"
 *                   modified_on:
 *                     type: string
 *                     format: date-time
 *                     description: The timestamp when the list was last modified
 *                     example: "2025-02-24T01:44:17.040Z"
 *   put:
 *     summary: Update a specific list by id
 *     description: Endpoint for updating a specific list by id
 *     operationId: updateList
 *     tags:
 *       - Lists
 *     parameters:
 *       - name: listId
 *         in: path
 *         required: true
 *         description: The ID of the list to update
 *         schema:
 *           type: number
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: New name of the list
 *                 example: "Fiction"
 *               year:
 *                 type: number
 *                 description: new year of the list
 *                 example: 2022
 *             oneOf:
 *               - required:
 *                 - name
 *               - required:
 *                 - year
 *             description: At least one of the fields (name or year) must be provided
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   list_id:
 *                     type: integer
 *                     description: The unique ID of the list
 *                     example: 1
 *                   user_id:
 *                     type: string
 *                     description: The user ID of the list owner
 *                     example: "google-oauth2|117717101958145567060"
 *                   name:
 *                     type: string
 *                     description: The name of the list
 *                     example: "Non-Fiction"
 *                   year:
 *                     type: integer
 *                     description: The year of the list
 *                     example: 2021
 *                   created_on:
 *                     type: string
 *                     format: date-time
 *                     description: The timestamp when the list was created
 *                     example: "2025-02-24T01:44:03.301Z"
 *                   modified_on:
 *                     type: string
 *                     format: date-time
 *                     description: The timestamp when the list was last modified
 *                     example: "2025-02-24T01:44:17.040Z"
 *   delete:
 *     summary: Delete a list
 *     description: Delete a list
 *     operationId: deleteList
 *     tags:
 *       - Lists
 *     parameters:
 *       - name: listId
 *         in: path
 *         required: true
 *         description: The ID of the list to be deleted
 *         schema:
 *           type: number
 *           example: 1
 *     responses:
 *       204:
 *         description: Successful response
 *       406:
 *         description: List not found
 */

router.route('/')
  .get(listsController.getAllLists)
  .post(listsController.createOneList);

router.route('/:listId')
  .get(listsController.getOneList)
  .put(listsController.updateList)
  .delete(listsController.deleteList);

module.exports = router;
