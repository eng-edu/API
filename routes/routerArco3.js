'use strict';

const express = require('express')
const router = express.Router()

//controller
const manterArco = require('../controllers/manterArco3')

//rotas
router.get('/:DOCENTE_ID', manterArco.get)




//exporta o modulo
module.exports = router

