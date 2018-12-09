'use strict';
const socket = require('../server/serverSocket');
const execute = require('../executeSQL');

socket.on('connection',(io)=>{
    io.on('ARCO_ID', (id)=>{
        List(id);
     });
 });

exports.post = ('/:TEXTO/:IDAUTOR/:DATA/:ARCO_ID', (req, res) => {

    const TEXTO = req.params.TEXTO;
    const IDAUTOR = req.params.IDAUTOR;
    const DATA = req.params.DATA;
    const ARCO_ID = req.params.ARCO_ID;

    var sqlQry = `INSERT INTO MENSAGEM (TEXTO, IDAUTOR, DATA, ARCO_ID) VALUES ('${TEXTO}','${IDAUTOR}','${DATA}','${ARCO_ID}')`;

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
    var sqlQry = `SELECT * FROM MENSAGEM WHERE ARCO_ID '${ARCO_ID}'`;
    execute.executeSQL(sqlQry, function (results) {

        if (results.length > 0) {
            socket.emit.broadcast(s, results);
            console.log("socket server emitiu: "+s);
        } 
        console.log(results)
    });
}