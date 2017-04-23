'use strict';

const io = require('socket.io-client');
const socket = io('http://localhost:4000');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
let token = '';

function consoleOut(...msg) {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  console.log(msg.join(' '));
  readline.prompt(true);
}

readline.on('line', line => {
  if (line.startsWith('/login ')) {
    socket.emit('loginMsg', line);
    readline.prompt(true);
  } else {
    socket.emit('clientMsg', {
      token, 
      msg: line
    });
  }
});

readline.prompt();

socket.on('chatMsg', data => {
  consoleOut(`${data.name}: ${data.message}`);
});

socket.on('serverMsg', data => {
  consoleOut(data);
});

socket.on('loggedIn', data => {
  if (data.error) {
    return consoleOut(data.error);
  }
  token = data.token
});