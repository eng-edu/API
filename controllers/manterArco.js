'use strict';

const execute = require('../executeSQL');

exports.get = ('/:ID', (req, res) => {
    var sqlQry = `SELECT * FROM ARCO WHERE ID = '${req.params.ID}'`;
    execute.executeSQL(sqlQry, function (results) {

        if (results.length > 0) {
            res.status(200).send(results)
        } else {
            res.status(405).send(results);
        }
        console.log(results)
    });

})

exports.post = ('/:STATUS/:NOME/:DOCENTE_ID', (req, res) => {

    const STATUS = req.params.STATUS;
    const NOME = req.params.NOME;
    const DOCENTE_ID = req.params.DOCENTE_ID;


    var sqlQry = `INSERT INTO ARCO (STATUS, NOME, DOCENTE_ID) VALUES ('${STATUS}','${NOME}','${DOCENTE_ID}')`;

    execute.executeSQL(sqlQry, function (results) {

        if (results['insertId'] > 0) {
            res.status(201).send({ results });
        } else {
            res.status(405).send(results);
        }
        console.log(results);
    });

});

exports.put = ('/:ID/:STATUS/:NOME/:DOCENTE_ID', (req, res) => {

    const ID = req.params.ID
    const STATUS = req.params.STATUS;
    const NOME = req.params.NOME;
    const DOCENTE_ID = req.params.DOCENTE_ID;

    var sqlQry = `UPDATE ARCO SET STATUS = '${STATUS}', NOME = '${NOME}', DOCENTE_ID = '${DOCENTE_ID}' WHERE ID = '${ID}'`

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
    var sqlQry = `DELETE FROM ARCO WHERE ID = '${req.params.ID}'`;
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
    var sqlQry = `SELECT * FROM ARCO`;
    execute.executeSQL(sqlQry, function (results) {

        if (results.length > 0) {
            res.status(200).send(results)
        } else {
            res.status(405).send(results);
        }
        console.log(results)
    });

})