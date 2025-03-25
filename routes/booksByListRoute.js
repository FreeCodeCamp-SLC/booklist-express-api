const express = require('express');

const router = express.Router();

const { booksByListController } = require('../controllers');

/**
 * @swagger
 * /api/booksByList:
 *   get:
 *     summary: GET request to get books by a given list id
 *     description: GET request to get books by a given list id
 *     operationId: getBooksByList
 *     tags:
 *       - Books
 *       - Lists
 *     parameters:
 *       - name: listIds
 *         in: query
 *         required: true
 *         description: list of list ids from which to retrieve the books
 *         schema:
 *           type: string
 *           example: "1,2"
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
 *                   book_id:
 *                     type: number
 *                     example: 1
 *                   user_id:
 *                     type: string
 *                     example: "google-oauth2|107881167133784281025"
 *                   list_id:
 *                     type: number
 *                     example: 1
 *                   author:
 *                     type: string
 *                     example: "J.R.R. Tolkien"
 *                   title:
 *                     type: string
 *                     example: "The Lord of the Rings: The Fellowship of the Ring"
 *                   image_url:
 *                     type: string
 *                   pages:
 *                     type: number
 *                   favorite:
 *                     type: boolean
 *                   reading_status_id:
 *                     type: number
 *                     example: 1
 *                   date_started:
 *                     type: string
 *                   date_finished:
 *                     type: string
 *                   created_on:
 *                     type: string
 *                   modified_on:
 *                     type: string
 *                   bookmark_page:
 *                     type: number
 *                   rating:
 *                     type: number
 *                   google_link:
 *                     type: string
 *                   description:
 *                     type: string
 */

router.route('/')
  .get(booksByListController.getBooksByList);

module.exports = router;
