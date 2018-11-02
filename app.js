const express = require('express');
const app = express();
const mysql = require('mysql');
const port = process.env.PORT || 3000

//chama os modulos das rotas
const indexRoute = require('./routes/index')
const discenteRoute = require('./routes/routerDiscente')
const docenteRoute = require('./routes/routerDocente')
const arcoRoute = require('./routes/routerArco')
const etapaRoute = require('./routes/routerEtapa')

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
app.use('/discente', discenteRoute)
app.use('/docente', docenteRoute)
app.use('/arco', arcoRoute)
app.use('/etapa', etapaRoute)

module.exports = app;