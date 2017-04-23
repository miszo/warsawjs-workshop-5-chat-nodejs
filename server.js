'use strict';

const io = require('socket.io')();

io.on('connection', client => {

  client.on('clientMsg', data => {
    console.log(`Client sent: ${data}`);
    io.emit('chatMsg', data);
    console.log(`Sent do all Clients: ${data}`);
  });

  client.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

console.log('Server start');

io.listen(4000);