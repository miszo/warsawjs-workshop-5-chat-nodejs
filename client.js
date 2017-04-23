'use strict';

const io = require('socket.io-client');
const socket = io('http://localhost:4000');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.on('line', line => {
  socket.emit('clientMsg', line);
});

readline.prompt();

socket.on('chatMsg', data => {
  console.log(data);
});