'use strict';

const express = require('express')
const router = express.Router()

//controller
const manterArco = require('../controllers/manterArco')

//rotas
router.get('/buscarArcoDiscente/:DISCENTE_ID/', manterArco.get1) 
router.post('/novoArco/:JSON/', manterArco.post2)
router.put('/compartilharArco/:ID/:COMPARTILHADO/', manterArco.put3)
router.delete('/excluirArco/:ID/', manterArco.delet4)
router.get('/bucarArcosCompartilhados/', manterArco.get5) 
router.put('/aceitarSolicitacao/:ID/:ARCO_ID/', manterArco.put6)
router.get('/buscarArcoDocente/:DOCENTE_ID/', manterArco.get7)
router.get('/buscarSolicitacoes/', manterArco.get8)



//exporta o modulo
module.exports = router

