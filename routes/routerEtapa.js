'use strict';

const express = require('express')
const router = express.Router()

//controller
const manterDocente = require('../controllers/manterEtapa')

//rotas
router.get('/:ID', manterEtapa.get)
router.post('/:NOME/:RESUMO/:STATUS/:ARCO_ID', manterEtapa.post)
router.put('/:ID/:NOME/:RESUMO/:STATUS/:ARCO_ID', manterEtapa.put)
router.delete('/:ID', manterEtapa.delet)
router.get('/list', manterEtapa.get)

//exporta o modulo
module.exports = router

