'use strict';

const execute = require('../executeSQL');

exports.get = ('/:ID', (req, res) => {
    var sqlQry = `SELECT * FROM MENSAGEM WHERE ID = '${req.params.ID}'`;
    execute.executeSQL(sqlQry, function (results) {

        if (results.length > 0) {
            res.status(200).send(results)
        } else {
            res.status(405).send(results);
        }
        console.log(results)
    });

})

exports.post = ('/:TEXTO/:IDAUTOR/:DATA/:ARCO_ID', (req, res) => {

    const TEXTO = req.params.TEXTO;
    const IDAUTOR = req.params.IDAUTOR;
    const DATA = req.params.DATA;
    const ARCO_ID = req.params.ARCO_ID;

    var sqlQry = `INSERT INTO MENSAGEM (TEXTO, IDAUTOR, DATA, ARCO_ID) VALUES ('${TEXTO}','${IDAUTOR}','${DATA}','${ARCO_ID}')`;

    execute.executeSQL(sqlQry, function (results) {

        if (results['insertId'] > 0) {
            res.status(201).send({ results });
        } else {
            res.status(405).send(results);
        }
        console.log(results);
    });

});

exports.put = ('/:ID/:TEXTO/:IDAUTOR/:DATA/:ARCO_ID', (req, res) => {

    const ID = req.params.ID
    const TEXTO = req.params.TEXTO;
    const IDAUTOR = req.params.IDAUTOR;
    const DATA = req.params.DATA;
    const ARCO_ID = req.params.ARCO_ID;

    var sqlQry = `UPDATE MENSAGEM SET TEXTO = '${TEXTO}', IDAUTOR = '${IDAUTOR}', DATA = '${DATA}', ARCO_ID = '${ARCO_ID}' WHERE ID = '${ID}'`

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
    var sqlQry = `DELETE FROM MENSAGEM WHERE ID = '${req.params.ID}'`;
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
    var sqlQry = `SELECT * FROM MENSAGEM`;
    execute.executeSQL(sqlQry, function (results) {

        if (results.length > 0) {
            res.status(200).send(results)
        } else {
            res.status(405).send(results);
        }
        console.log(results)
    });

})