const express = require("express")

const router = express.Router();

const { helloController } = require("../controllers")

router.route('/').get(helloController.hello)

module.exports = router