'use strict';

const io = require('socket.io')();

// io.on('connection', client => {
//   console.log('Nowy klient się podłączył');

//   client.on('pieniny', data => {
//     console.log(`Klient wysłał ${data}`);

//     client.emit('msg', 'Nie wysyłaj mi nic już!');
//   });
//   client.on('disconnect', () => {
//   console.log('Klient się rozłączył');
//   });
// });


// setInterval(() => {
//   io.emit('msg', 'jestem Panem Serwerem');
// }, 2000);

io.on('connection', client => {
  console.log('Nowy klient się podłączył');

  client.on('client-msg', data => {
    console.log(`Klient przesłał: ${data}`);
    client.broadcast.emit('broadcast', data);
    console.log(`Wysłałem do wszystkich: ${data}`);
  });

  client.on('disconnect', () => {
    console.log('Klient się rozłączył');
  });
});


console.log('Server start');

io.listen(4000);