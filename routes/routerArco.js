'use strict';

const express = require('express')
const router = express.Router()

//controller
const manterArco = require('../controllers/manterArco')

//rotas
router.get('/:ID', manterArco.get)
router.post('/:STATUS/:NOME/:DOCENTE_ID', manterArco.post)
router.put('/:ID/:STATUS/:NOME/:DOCENTE_ID', manterArco.put)
router.delete('/:ID', manterArco.delet)
router.get('/list', manterArco.get)

//exporta o modulo
module.exports = router

