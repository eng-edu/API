'use strict';

const execute = require('../executeSQL');

exports.get1 = ('/buscarArcoDiscente/:DISCENTE_ID', (req, res) => {


    var sqlQry = `select ARCO.ID, ARCO.STATUS, ARCO.NOME, ARCO.ID_CRIADOR, ARCO.DOCENTE_ID, ARCO.COMPARTILHADO from ARCO inner join GRUPO where DISCENTE_ID = '${req.params.DISCENTE_ID}' AND ARCO.ID = GRUPO.ARCO_ID`;
    execute.executeSQL(sqlQry, function (results) {

        if (results.length > 0) {
            res.status(200).send(results)
        } else {
            res.status(405).send(results);
        }
        console.log(results)
    });

})

exports.post2 = ('/novoArco/:JSON', (req, res) => {

    var jsonData = JSON.parse(req.params.JSON);

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

    function criargrupo() {

        var sqlQry2 = `INSERT INTO GRUPO (NOME, DISCENTE_ID, ARCO_ID) VALUES`;

        sqlQry2 = sqlQry2 + (` ('${NOMEGRUPO}',${ID_CRIADOR},${ARCO_ID}), `);

        var size = DISCENTES_ID.length;
        var count = 0;

        DISCENTES_ID.forEach(element => {

            count = count + 1;

            if (count == size) {
                sqlQry2 = sqlQry2 + (` ('${NOMEGRUPO}',${element.DISCENTE_ID},${ARCO_ID});`);
            } else {
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

    function cirarSolicitacao() {

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

    function criarEtapas() {

        var sqlQry4 = `INSERT INTO ETAPA (NOME, RESUMO, STATUS, ARCO_ID) VALUES 
        ('OBSERVAÇÃO DA REALIDADE','', 5, '${ARCO_ID}'), 
        ('PONTOS CHAVES','', 5, '${ARCO_ID}'),
        ('TEORIZAÇÃO','', 5, '${ARCO_ID}'),
        ('HIPÓTESES DE SOLUÇÃO','', 5, '${ARCO_ID}'),
        ('APLICAÇÃO A REALIDADE','', 5,'${ARCO_ID}');`;

        execute.executeSQL(sqlQry4, function (results) {

            if (results['insertId'] > 0) {
                res.status(201).send({ 'ARCO_ID': ARCO_ID });
            } else {
                res.status(405).send(results);
                console.log(results);
            }

        });
    }


})

exports.put3 = ('/compartilharArco/:ID/:COMPARTILHADO', (req, res) => {


    const ID = req.params.ID
    const COMPARTILHADO = req.params.COMPARTILHADO;

    var sqlQry = `UPDATE ARCO SET COMPARTILHADO = '${COMPARTILHADO}' WHERE ID = '${ID}'`

    execute.executeSQL(sqlQry, function (results) {
        if (results['affectedRows'] > 0) {
            res.status(201).send({ results });
        } else {
            res.status(405).send(results);
        }
        console.log(results);
    });

});

exports.delet4 = ('/excluirArco/:ID', (req, res) => {

    var sqlQry1 = `DELETE FROM ETAPA WHERE ARCO_ID = '${req.params.ID}'`;
    var sqlQry2 = `DELETE FROM GRUPO WHERE ARCO_ID = '${req.params.ID}'`;
    var sqlQry3 = `DELETE FROM SOLICITACAO WHERE ARCO_ID = '${req.params.ID}'`;
    var sqlQry4 = `DELETE FROM ARCO WHERE ID = '${req.params.ID}'`;

    deletarEtapa();

    function deletarEtapa() {

        execute.executeSQL(sqlQry1, function (results) {

            if (results['affectedRows'] > 0) {
                deletarGrupo()
            } else {
                console.log(results);
            }

        });

    }

    function deletarGrupo() {
        execute.executeSQL(sqlQry2, function (results) {

            if (results['affectedRows'] > 0) {
                deletarSolicitacao()
            } else {
                console.log(results);
            }

        });
    }

    function deletarSolicitacao() {
        execute.executeSQL(sqlQry3, function (results) {

            if (results['affectedRows'] > 0) {
                deletarArco()
            } else {
                console.log(results);
                deletarArco()
            }

        });
    }

    function deletarArco() {
        execute.executeSQL(sqlQry4, function (results) {

            if (results['affectedRows'] > 0) {
                res.status(200).send({ results });
            } else {
                res.status(405).send(results);
            }
            console.log(results);
        });

    }
})

exports.get5 = ('/bucarArcosCompartilhados', (req, res) => {
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

exports.put6 = ('/aceitarSolicitacao/:ID/:ARCO_ID', (req, res) => {



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

exports.get7 = ('/buscarArcoDocente/:DOCENTE_ID', (req, res) => {



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

exports.get8 = ('/buscarSolicitacoes', (req, res) => {

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
