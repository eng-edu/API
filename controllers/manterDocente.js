'use strict';

const execute = require('../executeSQL');

exports.get = ('/:ID', (req, res) => {
    var sqlQry = `SELECT * FROM DOCENTE WHERE ID = '${req.params.ID}'`;
    execute.executeSQL(sqlQry, function (results) {

        if (results.length > 0) {
            res.status(200).send(results)
        } else {
            res.status(405).send(results);
        }
        console.log(results)
    });

})

exports.post = ('/:NOME/:FORMACAO/:EMAIL/:SENHA', (req, res) => {

    const NOME = req.params.NOME;
    const FORMACAO = req.params.FORMACAO;
    const EMAIL = req.params.EMAIL;
    const SENHA = req.params.SENHA;

    var sqlQry = `INSERT INTO DOCENTE (NOME, FORMACAO, EMAIL, SENHA) VALUES ('${NOME}','${FORMACAO}','${EMAIL}','${SENHA}')`;

    execute.executeSQL(sqlQry, function (results) {

        if (results['insertId'] > 0) {
            res.status(201).send({ results });
        } else {
            res.status(405).send(results);
        }
        console.log(results);
    });

});

exports.put = ('/:ID/:NOME/:FORMACAO/:EMAIL/:SENHA', (req, res) => {

    const ID = req.params.ID
    const NOME = req.params.NOME
    const FORMACAO = req.params.FORMACAO
    const EMAIL = req.params.EMAIL
    const SENHA = req.params.SENHA

    var sqlQry = `UPDATE DOCENTE SET NOME = '${NOME}', FORMACAO = '${FORMACAO}', EMAIL = '${EMAIL}', SENHA = '${SENHA}' WHERE ID = '${ID}'`

    execute.executeSQL(sqlQry, function (results) {
        if (results['affectedRows'] > 0) {
            res.status(201).send({ results });
        } else {
            res.status(405).send(results);
        }
        console.log(results);
    });

});

exports.delet = ('/:ID', (req, res) => {
    var sqlQry = `DELETE FROM DOCENTE WHERE ID = '${req.params.ID}'`;
    execute.executeSQL(sqlQry, function (results) {

        if (results['affectedRows'] > 0) {
            res.status(200).send({ results });
        } else {
            res.status(405).send(results);
        }
        console.log(results);
    });

})

exports.get = ('/list', (req, res) => {
    var sqlQry = `SELECT * FROM DOCENTE`;
    execute.executeSQL(sqlQry, function (results) {

        if (results.length > 0) {
            res.status(200).send(results)
        } else {
            res.status(405).send(results);
        }
        console.log(results)
    });

})