const express = require('express');
const app = express();   
const mysql = require('mysql');
const port = process.env.PORT || 3000
const indexRoute = require('./routes/index')

//configura conexao com banco
exports.connection = mysql.createConnection({
  host: '191.252.193.192',
  port: '3306',
  user: 'root',
  password: '6code384',
  database: 'BDARCO'
});

//carregando rotas
app.use('/api', indexRoute);
 
module.exports = app;