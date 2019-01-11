'use strict';

const execute = require('../executeSQL');

exports.buscar = ('/buscar/:ID', (req, res) => {
    var sqlQry = `SELECT * FROM DOCENTE WHERE ID = '${req.params.ID}'`;
    execute.executeSQL(sqlQry, function (results) {

        if (results.length > 0) {
            res.status(200).send(results)
        } else {
            res.status(405).send(results);
        }
        console.log(results)
    });

})

exports.inserir = ('/inserir/:NOME/:FORMACAO/:EMAIL/:SENHA', (req, res) => {

    const NOME = req.params.NOME;
    const FORMACAO = req.params.FORMACAO;
    const EMAIL = req.params.EMAIL;
    const SENHA = req.params.SENHA; 
    var CAMINHO = "";
    var fs = require('fs');


    var sqlQry1 = `INSERT INTO GENERATE_ID (NAME) VALUES ('${req.files.file.name}')`;

    res.setHeader("Access-Control-Allow-Origin", "*");

    var temporario = req.files.file.path;
    
        execute.executeSQL(sqlQry1, function (results) {

            if (results['insertId'] > 0) {

                CAMINHO = './uploads/' + results['insertId'] + "_docente.jpg"

                fs.rename(temporario, CAMINHO, function (err) {
                    if (err) {
                        res.status(405).send(results);
                    }
                  
                    novoDocente()
                })

            } else {
                res.status(405).send(results);
            }
            console.log(results);
        });
    

  
    function novoDocente(){

        var sqlQry2 = `INSERT INTO DOCENTE (NOME, FORMACAO, EMAIL, SENHA, FOTO) VALUES ('${NOME}','${FORMACAO}','${EMAIL}','${SENHA}', '${CAMINHO}')`;

        execute.executeSQL(sqlQry2, function (results) {

            if (results['insertId'] > 0) {
                res.status(201).send({ results });
    
            } else {
                res.status(405).send(results);
            }
            console.log(results);
        });
    }



});

exports.modificar = ('/modificar/:ID/:NOME/:FORMACAO/:EMAIL/:SENHA', (req, res) => {

    const ID = req.params.ID
    const NOME = req.params.NOME
    const FORMACAO = req.params.FORMACAO
    const EMAIL = req.params.EMAIL
    const SENHA = req.params.SENHA

    var sqlQry = `UPDATE DOCENTE SET NOME = '${NOME}', FORMACAO = '${FORMACAO}', EMAIL = '${EMAIL}', SENHA = '${SENHA}' WHERE ID = '${ID}'`

    execute.executeSQL(sqlQry, function (results) {
        if (results['affectedRows'] > 0) {
            res.status(201).send({ results });
        } else {
            res.status(405).send(results);
        }
        console.log(results);
    });

});

exports.deletar = ('/deletar/:ID', (req, res) => {
    var sqlQry = `DELETE FROM DOCENTE WHERE ID = '${req.params.ID}'`;
    execute.executeSQL(sqlQry, function (results) {

        if (results['affectedRows'] > 0) {
            res.status(200).send({ results });
        } else {
            res.status(405).send(results);
        }
        console.log(results);
    });

})

exports.listar = ('/listar', (req, res) => {
    var sqlQry = `SELECT * FROM DOCENTE`;
    execute.executeSQL(sqlQry, function (results) {

        if (results.length > 0) {
            res.status(200).send(results)
        } else {
            res.status(405).send(results);
        }
        console.log(results)
    });

})