'use strict';

const execute = require('../executeSQL');
exports.get = ('/compartilhados', (req, res) => {
    var sqlQry = `SELECT * FROM ARCO WHERE COMPARTILHADO = 1`;
    execute.executeSQL(sqlQry, function (results) {
        if (results.length > 0) {
            res.status(200).send(results)
        } else {
            res.status(405).send(results);
        }
        console.log(results)
    });

}) 
