'use strict';

const express = require('express')
const router = express.Router()

//controller
const manterDiscente = require('../controllers/manterDiscente')

//rotas
router.get('/:ID', manterDiscente.get)
router.post('/:NOME/:INSTITUICAO/:EMAIL/:SENHA', manterDiscente.post)
router.put('/:ID/:NOME/:INSTITUICAO/:EMAIL/:SENHA', manterDiscente.put)
router.delete('/:ID', manterDiscente.delet)
router.get('/list', manterDiscente.get)

//exporta o modulo
module.exports = router

