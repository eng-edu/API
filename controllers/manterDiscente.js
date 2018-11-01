'use strict';

const execute = require('../executeSQL');

exports.get = ('/:ID', (req, res) =>{
    var sqlQry = `SELECT * FROM DISCENTE WHERE ID = '${req.params.ID}'`;
    execute.executeSQL(sqlQry, function(results){
     
        if(results.length>0){
            res.status(200).send(results)
        }else{
            res.status(405).send(results);
        }
        console.log(results)
    });

})

exports.post = ('/:NOME/:INSTITUICAO/:EMAIL/:SENHA', (req, res) => { 
      
    const NOME =  req.params.NOME;
    const INSTITUICAO =  req.params.INSTITUICAO;
    const EMAIL =  req.params.EMAIL;
    const SENHA =  req.params.SENHA;
    
   var sqlQry = `INSERT INTO DISCENTE (NOME, INSTITUICAO, EMAIL, SENHA) VALUES ('${NOME}','${INSTITUICAO}','${EMAIL}','${SENHA}')`;

    execute.executeSQL(sqlQry, function(results){
    
        if(results['insertId'] > 0){
            res.status(201).send({results});
        }else{
            res.status(405).send(results);
        }
        console.log(results);
    });
    
});

exports.put = ('/:ID/:NOME/:INSTITUICAO/:EMAIL/:SENHA', (req, res) => { 
    
    const ID =  req.params.ID
    const NOME =  req.params.NOME
    const INSTITUICAO =  req.params.INSTITUICAO
    const EMAIL =  req.params.EMAIL
    const SENHA =  req.params.SENHA
    
   var sqlQry = `UPDATE DISCENTE SET NOME = '${NOME}', INSTITUICAO = '${INSTITUICAO}', EMAIL = '${EMAIL}', SENHA = '${SENHA}' WHERE ID = '${ID}'`

    execute.executeSQL(sqlQry, function(results){
        if(results['affectedRows'] > 0){
            res.status(201).send({results});
        }else{
            res.status(405).send(results);
        }
        console.log(results);
    });
    
});

exports.delet = ('/:ID', (req, res) =>{
    var sqlQry = `DELETE FROM DISCENTE WHERE ID = '${req.params.ID}'`;
    execute.executeSQL(sqlQry, function(results){
     
        if(results.length>0){
            res.status(200).send(results)
        }else{
            res.status(405).send(results);
        }
        console.log(results)
    });

})

exports.get = ('/list', (req, res) =>{
    var sqlQry = `SELECT * FROM DISCENTE`;
    execute.executeSQL(sqlQry, function(results){
     
        if(results.length>0){
            res.status(200).send(results)
        }else{
            res.status(405).send(results);
        }
        console.log(results)
    });

})