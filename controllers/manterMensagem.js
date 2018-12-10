'use strict';
const socket = require('../server/serverSocket');
const execute = require('../executeSQL');

socket.on('connection',(io)=>{
    io.on('LIST_MSG', (id)=>{
        List(id);
        console.log(id)
     });
 });

exports.post = ('/:TEXTO/:ID_AUTOR/:NOME_AUTOR/:DATA/:ARCO_ID', (req, res) => {

    const TEXTO = req.params.TEXTO;
    const ID_AUTOR = req.params.ID_AUTOR;
    const NOME_AUTOR = req.params.NOME_AUTOR;
    const DATA = req.params.DATA;
    const ARCO_ID = req.params.ARCO_ID;

    var sqlQry = `INSERT INTO MENSAGEM (TEXTO, ID_AUTOR, NOME_AUTOR, DATA, ARCO_ID) VALUES ('${TEXTO}',${ID_AUTOR},'${NOME_AUTOR}','${DATA}',${ARCO_ID})`;

    execute.executeSQL(sqlQry, function (results) {

        if (results['insertId'] > 0) {
            res.status(201).send({ results });
            List(ARCO_ID);
        } else {
            res.status(405).send(results);
        }
        console.log(results);
    });

});


function List(ARCO_ID){

    var s = 'msg'+ARCO_ID;
    var sqlQry = `SELECT * FROM MENSAGEM WHERE ARCO_ID = ${ARCO_ID}`;
    execute.executeSQL(sqlQry, function (results) {

        if (results.length > 0) {
            socket.broadcast(s, results);
            console.log("socket server emitiu: "+s);
        } 
        console.log(results)
    });
}