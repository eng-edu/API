const express = require('express')
const router = express.Router()
const multiparty = require('connect-multiparty');

router.post(multiparty(), require('../controllers/controllerUp'));

module.exports = router

