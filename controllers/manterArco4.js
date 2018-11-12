'use strict';
const execute = require('../executeSQL');

exports.get = ('/solicitacoes', (req, res) => {

    var sqlQry = `SELECT S.ID, S.ARCO_ID, S.DOCENTE_ID, A.NOME FROM SOLICITACAO AS S INNER JOIN ARCO AS A WHERE S.ARCO_ID = A.ID`;
    
    execute.executeSQL(sqlQry, function (results) {
        if (results.length > 0) {
            res.status(200).send(results)
        } else {
            res.status(405).send(results);
        }
        console.log(results)
    });

})
