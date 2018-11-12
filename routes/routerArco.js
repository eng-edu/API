'use strict';

const express = require('express')
const router = express.Router()

//controller
const manterArco = require('../controllers/manterArco')

//rotas
router.get('/:DISCENTE_ID', manterArco.get) 
router.post('/:json', manterArco.post)
router.put('/:ID/:COMPARTILHADO', manterArco.put)
router.delete('/:ID', manterArco.delet)



//exporta o modulo
module.exports = router

