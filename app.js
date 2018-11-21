
//modulos
const express = require('express');
const app = express();
const mysql = require('mysql');

//chama os modulos das rotas
const upRoute = require('./routes/up')
const indexRoute = require('./routes/index')
const discenteRoute = require('./routes/routerDiscente')
const docenteRoute = require('./routes/routerDocente')
const arcoRoute = require('./routes/routerArco')
const etapaRoute = require('./routes/routerEtapa')
const documentoRoute = require('./routes/routerDocumento')
const mensagemRoute = require('./routes/routerMensagem')
const discenteLogin = require('./routes/loginDiscente')
const docenteLogin = require('./routes/loginDocente')

const tokenAPI = require('./token')

//configura conexao com banco
exports.connection = mysql.createConnection({
  host: '191.252.193.192',
  port: '3306',
  user: 'root',
  password: '6code384',
  database: 'BDARCO'
});


//carregando rotas
app.use('/index', indexRoute);
app.use('/loginDiscente', discenteLogin)
app.use('/loginDocente', docenteLogin)


//interceptar as rotas
app.use(function (req, res, next) {

  //pegar o token nos headers da requisição
  var tokenCli = req.headers['token'];

  // verifica se o token é valido
  if (tokenCli == tokenAPI) {
    next();
  } else {
    res.status(203).send('não autorizado!');
  }

});

//setando as rotas
app.use('/discente', discenteRoute)
app.use('/docente', docenteRoute)
app.use('/arco', arcoRoute)
app.use('/etapa', etapaRoute)
app.use('/documento', documentoRoute)
app.use('/mensagem', mensagemRoute)
app.use('/upp', upRoute)


//exporta o modulo
module.exports = app;