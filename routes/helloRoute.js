const express = require('express');

const router = express.Router();

const { helloController } = require('../controllers');

/**
 * @swagger
 * /api/hello:
 *   get:
 *     summary: Example that returns 'hello'
 *     description: Example that returns 'hello' string
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: 'hello'
 */

router.route('/').get(helloController.hello);

module.exports = router;
