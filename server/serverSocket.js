'use strict';

const io = require('socket.io')();
io.on('connection',(socket)=>{
    console.log('novo usuario conectado: '+socket.id);
    socket.on('disconnect', function(){
        console.log('usuario desconectou: '+socket.id);
    });
});

module.exports = io;