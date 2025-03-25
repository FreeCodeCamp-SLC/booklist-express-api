const express = require('express');

const router = express.Router();

const { booksController } = require('../controllers');

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: POST request to create a single book record in db
 *     description: POST request to create a single book record in db
 *     opeationId: createOneBook
 *     tags:
 *       - Books
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               list_id:
 *                 type: number
 *                 example: 1
 *               author:
 *                 type: string
 *                 example: "J.R.R. Tolkien"
 *               title:
 *                 type: string
 *                 example: "The Lord of the Rings: The Fellowship of the Ring"
 *     responses:
 *       201:
 *         description: Book record successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 book_id:
 *                   type: number
 *                   example: 1
 *                 user_id:
 *                   type: string
 *                   example: "google-oauth2|107881167133784281025"
 *                 list_id:
 *                   type: number
 *                   example: 1
 *                 author:
 *                   type: string
 *                   example: "J.R.R. Tolkien"
 *                 title:
 *                   type: string
 *                   example: "The Lord of the Rings: The Fellowship of the Ring"
 *                 image_url:
 *                   type: string
 *                 pages:
 *                   type: number
 *                 favorite:
 *                   type: boolean
 *                 reading_status_id:
 *                   type: number
 *                   example: 1
 *                 date_started:
 *                   type: string
 *                 date_finished:
 *                   type: string
 *                 created_on:
 *                   type: string
 *                 modified_on:
 *                   type: string
 *                 bookmark_page:
 *                   type: number
 *                 rating:
 *                   type: number
 *                 google_link:
 *                   type: string
 *                 description:
 *                   type: string
 *   get:
 *     summary: Get all books
 *     description: Get all user books and totalCount
 *     operationId: getAllBooks
 *     tags:
 *       - Books
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
 * /api/books/:bookId:
 *   get:
 *     summary: Get one book by book id
 *     description: Get one book by book ID
 *     operationId: getOneBook
 *     tags:
 *       - Books
 *     parameters:
 *       - name: bookId
 *         in: path
 *         required: true
 *         description: The ID of the book to retrieve
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
 *   put:
 *     summary: Update a book
 *     operationId: updateBook
 *     tags:
 *     - Books
 *     parameters:
 *       - name: bookId
 *         in: path
 *         required: true
 *         description: The ID of the book to update
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
 *               author:
 *                 type: string
 *                 example: "New Author Name"
 *               title:
 *                 type: string
 *                 example: "New Title"
 *               image_url:
 *                 type: string
 *               pages:
 *                 type: number
 *               favorite:
 *                 type: boolean
 *               reading_status_id:
 *                 type: number
 *               date_started:
 *                 type: string
 *               date_finished:
 *                 type: string
 *               bookmark_page:
 *                 type: number
 *               rating:
 *                 type: number
 *               google_link:
 *                 type: string
 *               description:
 *                 type: string
 *             oneOf:
 *               - required:
 *                 - author
 *               - required:
 *                 - title
 *               - required:
 *                 - image_url
 *               - required:
 *                 - pages
 *               - required:
 *                 - favorite
 *               - required:
 *                 - reading_status_id
 *               - required:
 *                 - date_started
 *               - required:
 *                 - date_finished
 *               - required:
 *                 - bookmark_page
 *               - required:
 *                 - rating
 *               - required:
 *                 - google_link
 *               - required:
 *                 - description
 *             description: |
 *               At least one of the fields (author, title, image_url, pages, favorite, reding_status_id, date_started, date_finished, bookmark_page, rating, google_link, description) must be provided
 *   delete:
 *     summary: delete a book by id
 *     description: Delete a book by id
 *     operationId: deleteBook
 *     tags:
 *       - Books
 *     parameters:
 *       - name: bookId
 *         in: path
 *         required: true
 *         description: The ID of the book to be deleted
 *         schema:
 *           type: number
 *           example: 1
 */

router.route('/')
  .get(booksController.getAllBooks)
  .post(booksController.createOneBook);

router.route('/:bookId')
  .get(booksController.getOneBook)
  .put(booksController.updateBook)
  .delete(booksController.deleteBook);

module.exports = router;
