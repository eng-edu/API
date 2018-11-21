'use strict';

const express = require('express')
const router = express.Router()

//controller
const manterDocente = require('../controllers/manterDocente')

//rotas
router.get('/:ID', manterDocente.get)
router.post('/:NOME/:FORMACAO/:EMAIL/:SENHA', manterDocente.post)
router.put('/:ID/:NOME/:FORMACAO/:EMAIL/:SENHA', manterDocente.put)
router.delete('/:ID', manterDocente.delet)
router.get('/list', manterDocente.get)

//exporta o modulo
module.exports = router

