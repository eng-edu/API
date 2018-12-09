'use strict';

const execute = require('../executeSQL');

exports.put1 = ('/salvarEtapa/:ID/:RESUMO', (req, res) => {

    const ID = req.params.ID
    const RESUMO = req.params.RESUMO;

    var sqlQry = `UPDATE ETAPA SET RESUMO = '${RESUMO}' WHERE ID = '${ID}'`

    execute.executeSQL(sqlQry, function (results) {
        if (results['affectedRows'] > 0) {
            res.status(200).send({ results });
        } else {
            res.status(405).send(results);
        }
        console.log(results);
    });

});

exports.put2 = ('/submeterEtapa/:ID/:RESUMO', (req, res) => {

    const ID = req.params.ID
    const RESUMO = req.params.RESUMO;
    console.log("chamou!!")

    var sqlQry = `UPDATE ETAPA SET RESUMO = '${RESUMO}', STATUS = 2 WHERE ID = '${ID}'`

    execute.executeSQL(sqlQry, function (results) {
        if (results['affectedRows'] > 0) {
            res.status(200).send({ results });
        } else {
            res.status(405).send(results);
        }
        console.log(results);
    });

});

exports.put3 = ('/aprovarEtapa/:ID/:PROX_ID/:ARCO_ID', (req, res) => {

    const ID = req.params.ID
    const PROX_ID = req.params.PROX_ID
    const ARCO_ID = req.params.ARCO_ID


    //falta o id do arco

    var sqlQry1 = `UPDATE ETAPA SET STATUS = 1 WHERE ID = '${ID}' AND ARCO_ID = '${ARCO_ID}'`
    var sqlQry2 = `UPDATE ETAPA SET STATUS = 4 WHERE ID = '${PROX_ID}' AND ARCO_ID = '${ARCO_ID}' AND NOT STATUS = 1`
    var sqlQry3 = `CALL verificar_completo(${ARCO_ID})`
  
    

    execute.executeSQL(sqlQry1, function (results) {
        if (results['affectedRows'] > 0) {
            mudarStatusPorx()
        
        } else {
            console.log(results);
        }

    });

    function mudarStatusPorx() {
        execute.executeSQL(sqlQry2, function (results) {

            if (results['affectedRows'] > 0) {
                res.status(200).send({ results });
            } else {
                res.status(200).send(results);
            }
            console.log(results);
        });
    }

    verficar()

    function verficar(){
        execute.executeSQL(sqlQry3, function (results) {
            console.log("EXECUTOU");
    });

    }
   
});

exports.put4 = ('/reprovarEtapa/:ID', (req, res) => {

    const ID = req.params.ID

    var sqlQry = `UPDATE ETAPA SET STATUS = 3 WHERE ID = '${ID}'`

    execute.executeSQL(sqlQry, function (results) {
        if (results['affectedRows'] > 0) {
            res.status(200).send({ results });
        } else {
            res.status(405).send(results);
        }
        console.log(results);
    });

});

exports.get5 = ('/listarEtapasArco/:ARCO_ID', (req, res) => {

    const ID = req.params.ARCO_ID

    var sqlQry = `SELECT * FROM ETAPA WHERE ARCO_ID = '${ID}'`

    execute.executeSQL(sqlQry, function (results) {
        if (results.length > 0) {
            res.status(200).send(results);
        } else {
            res.status(405).send(results);
        }
        console.log(results);
    });

});