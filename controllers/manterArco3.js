'use strict';
const execute = require('../executeSQL');

exports.get = ('/:DOCENTE_ID', (req, res) => {


    var sqlQry = `SELECT * FROM ARCO WHERE DOCENTE_ID = '${req.params.DOCENTE_ID}' AND NOT ARCO.STATUS = 'AGUARDANDO APROVAÇÃO DE ORIENTAÇÃO';`;

    execute.executeSQL(sqlQry, function (results) {
        if (results.length > 0) {
            res.status(200).send(results)
        } else {
            res.status(405).send(results);
        }
        console.log(results)
    });

})
