'use strict';

const execute = require('../executeSQL');
exports.get = ('/compartilhados', (req, res) => {
    var sqlQry = `SELECT * FROM ARCO WHERE COMPARTILHADO = 1 AND NOT ARCO.STATUS = 'AGUARDANDO APROVAÇÃO DE ORIENTAÇÃO';`;
    execute.executeSQL(sqlQry, function (results) {
        if (results.length > 0) {
            res.status(200).send(results)
        } else {
            res.status(405).send(results);
        }
        console.log(results)
    });

})



exports.put = ('/:ID/:ARCO_ID', (req, res) => {



    var sqlQry1 = `UPDATE ARCO SET STATUS = 'EM DESENVOLVIMENTO' WHERE ID = '${req.params.ARCO_ID}'`;
    var sqlQry2 = `UPDATE ETAPA SET STATUS = 4 WHERE ARCO_ID = '${req.params.ARCO_ID}' AND NOME = 'OBSERVAÇÃO DA REALIDADE';`;
    var sqlQry3 = `DELETE FROM SOLICITACAO WHERE ID = '${req.params.ID}'`;
   
    atulilzarStatusarco();

    function atulilzarStatusarco() {
        execute.executeSQL(sqlQry1, function (results) {

            if (results['affectedRows'] > 0) {
                atulilzarEtapa()
            } else {
                console.log(results)
            }
            
        });

    }

    function atulilzarEtapa() {
        execute.executeSQL(sqlQry2, function (results) {

            if (results['affectedRows'] > 0) {
                excluirSolicitacao()
            } else {
                console.log(results)
            }
           
        });

    }


    function excluirSolicitacao() {
        execute.executeSQL(sqlQry3, function (results) {

            if (results['affectedRows'] > 0) {
                res.status(201).send(results)
            } else {
                res.status(405).send(results);
            }
            console.log(results)
        });
    }



})
