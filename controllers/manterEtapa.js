'use strict';

const execute = require('../executeSQL');

exports.get = ('/:ID', (req, res) => {
    var sqlQry = `SELECT * FROM ETAPA WHERE ID = '${req.params.ID}'`;
    execute.executeSQL(sqlQry, function (results) {

        if (results.length > 0) {
            res.status(200).send(results)
        } else {
            res.status(405).send(results);
        }
        console.log(results)
    });

})

exports.post = ('/:NOME/:RESUMO/:STATUS/:ARCO_ID', (req, res) => {

    const NOME = req.params.NOME;
    const RESUMO = req.params.RESUMO;
    const STATUS = req.params.STATUS;
    const ARCO_ID = req.params.ARCO_ID;

    var sqlQry = `INSERT INTO ETAPA (NOME, RESUMO, STATUS, ARCO_ID) VALUES ('${NOME}','${RESUMO}','${STATUS}','${ARCO_ID}')`;

    execute.executeSQL(sqlQry, function (results) {

        if (results['insertId'] > 0) {
            res.status(201).send({ results });
        } else {
            res.status(405).send(results);
        }
        console.log(results);
    });

});

exports.put = ('/:ID/:NOME/:RESUMO/:STATUS/:ARCO_ID', (req, res) => {

    const ID = req.params.ID
    const NOME = req.params.NOME;
    const RESUMO = req.params.RESUMO;
    const STATUS = req.params.STATUS;
    const ARCO_ID = req.params.ARCO_ID;

    var sqlQry = `UPDATE ETAPA SET NOME = '${NOME}', RESUMO = '${RESUMO}', STATUS = '${STATUS}', ARCO_ID = '${ARCO_ID}' WHERE ID = '${ID}'`

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
    var sqlQry = `DELETE FROM ETAPA WHERE ID = '${req.params.ID}'`;
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
    var sqlQry = `SELECT * FROM ETAPA`;
    execute.executeSQL(sqlQry, function (results) {

        if (results.length > 0) {
            res.status(200).send(results)
        } else {
            res.status(405).send(results);
        }
        console.log(results)
    });

})