
'use strict';

const express = require('express');
const router = express.Router();

//rota principal, raiz da aplicação
router.get('/', (req, res) => { 
    res.status(200).send({
       title: 'API NodeJs - SISTEMA ARCO',
       version: '0.0.1',
       developer: 'eduardo lima',
       email: 'eduardo.eng15@gmail.com'
    });
});

module.exports = router;
