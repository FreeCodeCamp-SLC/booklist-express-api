const express = require('express');

const router = express.Router();

const { favoritesController } = require('../controllers');

/**
 * @swagger
 * /api/favorites:
 *   get:
 *     summary: GET request for user favorites
 *     description: GET request, paginated user favorites
 *     operationId: getAllFavorites
 *     tags:
 *       - Favorites
 *     parameters:
 *       - name: booksItemCount
 *         in: query
 *         required: false
 *         description: number of items to return on page request
 *         schema:
 *           type: number
 *           example: 10
 *       - name: pageNumber
 *         in: query
 *         required: false
 *         description: The page number of the request
 *         schema:
 *           type: number
 *           example: 1
 *       - name: sortBy
 *         in: query
 *         required: false
 *         description: Field by which to sort the results (Title, Book id)
 *     responses:
 *       200:
 *         description: Successful response
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
 *                         book_id:
 *                           type: number
 *                           example: 1
 *                         user_id:
 *                           type: string
 *                           example: "google-oauth2|107881167133784281025"
 *                         list_id:
 *                           type: number
 *                           example: 1
 *                         author:
 *                           type: string
 *                           example: "J.R.R. Tolkien"
 *                         title:
 *                           type: string
 *                           example: "The Lord of the Rings: The Fellowship of the Ring"
 *                         image_url:
 *                           type: string
 *                         pages:
 *                           type: number
 *                         favorite:
 *                           type: favorite
 *                         reading_status_id:
 *                           type: number
 *                           example: 1
 *                         date_started:
 *                           type: string
 *                         date_finished:
 *                           type: string
 *                         created_on:
 *                           type: string
 *                         modified_on:
 *                           type: string
 *                         bookmark_page:
 *                           type: number
 *                         rating:
 *                           type: number
 *                         google_link:
 *                           type: string
 *                         description:
 *                           type: string
 *                   - type: object
 *                     properties:
 *                       totalListCount:
 *                         type: integer
 *                         description: The total number of lists
 *                         example: 1
 *
 */

router.route('/')
  .get(favoritesController.getAllFavorites);

module.exports = router;
