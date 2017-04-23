'use strict';

const io = require('socket.io')();

const db = require('./db.js');
const tokenGenerator = require('./tokenGenerator.js');
const auth = require('./auth.js');

function messageHandler(client, data) {
  console.log(`Client ${data.nick} [${client.id}] sent: ${data.msg}`);
    io.emit('chatMsg', {
      name: data.nick,
      message: data.msg
    });
    console.log(`Sent from ${data.nick} [${client.id}] do all Clients: ${data.msg}`);
}

io.on('connection', client => {
  client.on('loginMsg', data => {
    const split = data.split(' ');
    db.login(split[1], split[2])
      .then(user => {
        if (!user) {
          return client.emit('loggedIn', {
            error: 'Username or Password does not match'
          })
        }
        console.log(`Client ${user.name} [${client.id}] logged in`);
        io.emit('serverMsg', `${user.name} joined the chat`);
        
        return client.emit('loggedIn', {
          token: tokenGenerator.generate(user)
        })
      })
      .catch(err => {
        console.log('Error', err);
      });

  });

  client.on('clientMsg', auth(client, messageHandler));

  client.on('disconnect', () => {
    console.log(`Client [${client.id}] disconnected`);
  });
});

console.log('Server start');

io.listen(4000);
