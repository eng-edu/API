'use strict';

const io = require('socket.io')();
io.on('connection',(socket)=>{
    socket.on('disconnect', function(){
    });
});

module.exports = io;