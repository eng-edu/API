'use strict';

const express = require('express')
const router = express.Router()
const multiparty = require('connect-multiparty');




//controller
const manterDiscente = require('../controllers/manterDiscente')

//rotas
router.get('/:ID', manterDiscente.get)
router.route('/:NOME/:INSTITUICAO/:EMAIL/:SENHA').post(multiparty(), manterDiscente.post)
router.put('/:ID/:NOME/:INSTITUICAO/:EMAIL/:SENHA', manterDiscente.put)
router.delete('/:ID', manterDiscente.delet)
router.get('/list', manterDiscente.get)

//exporta o modulo
module.exports = router

