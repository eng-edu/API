'use strict';

const express = require('express')
const router = express.Router()

//controller
const manterArco = require('../controllers/manterArco2')

//rotas
router.get('/compartilhados', manterArco.get) 
router.put('/:ID/:ARCO_ID', manterArco.put)


//exporta o modulo
module.exports = router

