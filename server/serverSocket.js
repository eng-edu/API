'use strict';


const io = require('socket.io')();
io.on('connection',(socket)=>{
    console.log('novo usuario conectado: '+socket.id+data);
    socket.on('disconnect', function(){
        console.log('usuario desconectou: '+socket.id+data);
    });
});

module.exports = io;