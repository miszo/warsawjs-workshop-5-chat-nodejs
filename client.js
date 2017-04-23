'use strict';

const io = require('socket.io-client');
const socket = io('http://localhost:4000');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

// readline.on('line', line => {
//   console.log(`odczytałem: ${line}`);
// });

// readline.prompt();

// setInterval(() => {
//   console.log('Wysyłam wiadomość...');
//   socket.emit('pieniny', 'Hello World!');
// }, 2000);

// let count = 0;
// socket.on('msg', data => {
//   count++;
//   console.log(`Wiadomość od Serwera #${count}: ${data}`);
// });

readline.on('line', line => {
  socket.emit('client-msg', line);
});

readline.prompt();

socket.on('broadcast', data => {
  console.log(data);
});