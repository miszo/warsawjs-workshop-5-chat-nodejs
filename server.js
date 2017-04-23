'use strict';

const io = require('socket.io')();

io.on('connection', client => {
  client.name = client.conn.id;
  console.log(`Client ${client.name} connected`);
  io.emit('serverMsg', `Client ${client.name} joined chat`);

  client.on('loginMsg', data => {
    let indexStart = data.indexOf(' ');
    client.prevName = client.name;
    client.name = data.substring(indexStart+1, data.length);
    console.log(`Client ${client.prevName} renamed to: ${client.name}`);
    io.emit('serverMsg', `${client.prevName} is now: ${client.name}`);
  });

  client.on('clientMsg', data => {
    console.log(`Client ${client.name} sent: ${data}`);
    io.emit('chatMsg', {
      name: client.name,
      message: data
    });
    console.log(`Sent from ${client.name} do all Clients: ${data}`);
  });

  client.on('disconnect', () => {
    console.log(`Client ${client.name} disconnected`);
  });
});

console.log('Server start');

io.listen(4000);
