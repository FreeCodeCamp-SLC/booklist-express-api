const express = require('express');

const router = express.Router();

const { allListsController } = require('../controllers');

/**
 * @swagger
 * /api/allLists:
 *   get:
 *     summary: Get all lists
 *     description: Retrieves a list of lists along with the total count of lists. Uses the `allListsController.getAllLists` function.
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
 */

router.route('/')
  .get(allListsController.getAllLists);

module.exports = router;
