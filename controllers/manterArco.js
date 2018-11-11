'use strict';

const execute = require('../executeSQL');

exports.get = ('/:DISCENTE_ID', (req, res) => {
    var sqlQry = `select * from ARCO inner join GRUPO where DISCENTE_ID = '${req.params.DISCENTE_ID}' AND ARCO.ID = GRUPO.ARCO_ID`;
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

exports.post = ('/:json', (req, res) => {

    var jsonData = JSON.parse(req.params.json); 

    const STATUS = "AGUARDANDO APROVAÇÃO DE ORIENTAÇÃO";
    const NOME = jsonData.NOMEARCO;
    const DOCENTE_ID = jsonData.DOCENTE_ID;
    const NOMEGRUPO = jsonData.NOMEGRUPO;
    const DISCENTES_ID = jsonData.DISCENTES_ID; 
    const ID_CRIADOR = jsonData.ID_CRIADOR;
    var ARCO_ID = "";


    //----------------------------------------------------------------------------------------------------

    var sqlQry1 = `INSERT INTO ARCO (STATUS, NOME, ID_CRIADOR, DOCENTE_ID) VALUES ('${STATUS}','${NOME}','${ID_CRIADOR}','${DOCENTE_ID}')`;

    execute.executeSQL(sqlQry1, function (results) {

        if (results['insertId'] > 0) {
            ARCO_ID = results['insertId']
            criargrupo();
        } else {
            console.log(results);
        }
        
    });

    //----------------------------------------------------------------------------------------------------

    function criargrupo(){
        
        var sqlQry2 = `INSERT INTO GRUPO (NOME, DISCENTE_ID, ARCO_ID) VALUES`;
    
        sqlQry2 = sqlQry2 + (` ('${NOMEGRUPO}',${ID_CRIADOR},${ARCO_ID}), `);
        
        var size = DISCENTES_ID.length;
        var count = 0;
    
        DISCENTES_ID.forEach(element => {
         
        count = count + 1;
            
            if(count == size){
                sqlQry2 = sqlQry2 + (` ('${NOMEGRUPO}',${element.DISCENTE_ID},${ARCO_ID});`);
            }else{
                sqlQry2 = sqlQry2 + (` ('${NOMEGRUPO}',${element.DISCENTE_ID},${ARCO_ID}), `);
            }
                    
        });
    
        execute.executeSQL(sqlQry2, function (results) {
    
            if (results['insertId'] > 0) {
                cirarSolicitacao()
            } else {
                console.log(results); 
            }
          
        });
    }

    

   //----------------------------------------------------------------------------------------------------

   function cirarSolicitacao(){
    
    var sqlQry3 = `INSERT INTO SOLICITACAO (ARCO_ID, DOCENTE_ID) VALUES ('${ARCO_ID}','${DOCENTE_ID}')`;

    execute.executeSQL(sqlQry3, function (results) {

        if (results['insertId'] > 0) {
            criarEtapas()
        } else {
            console.log(results);
        }
        
    });
   }
   

    //----------------------------------------------------------------------------------------------------

    function criarEtapas(){

        var sqlQry4 = `INSERT INTO ETAPA (NOME, RESUMO, STATUS, ARCO_ID) VALUES 
        ('OBSERVAÇÃO DA REALIDADE','', 5, '${ARCO_ID}'), 
        ('PONTOS CHAVES','', 5, '${ARCO_ID}'),
        ('TEORIZAÇÃO','', 5, '${ARCO_ID}'),
        ('HIPÓTESES DE SOLUÇÃO','', 5, '${ARCO_ID}'),
        ('APLICAÇÃO A REALIDADE','', 5,'${ARCO_ID}');`;
 
        execute.executeSQL(sqlQry4, function (results) {
    
            if (results['insertId'] > 0) {
                res.status(201).send({ 'ARCO_ID': ARCO_ID});
            } else {
                res.status(405).send(results);
                console.log(results);
            }
            
        });
    }


})


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





/**exports.get = ('/compartilhados', (req, res) => {
    var sqlQry = `SELECT * FROM ARCO WHERE COMPARTILHADO = 1`;
    execute.executeSQL(sqlQry, function (results) {

        if (results['affectedRows'] > 0) {
            res.status(200).send({ results });
        } else {
            res.status(405).send(results);
        }
        console.log(results);
    });

}) */
