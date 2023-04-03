const net = require('net');
const readline = require('readline');

const PORT = process.argv[2];
const HOST = process.argv[3];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function sendMessage(socket, message) {
  socket.write(message);

  socket.once('data', (data) => {
    console.log(`Received response: ${data.toString()}`);
    socket.end();
  });
}

function startClient() {
  const socket = net.connect({ port: PORT, host: HOST }, () => {
    console.log(`Connected to ${HOST}:${PORT}`);

    rl.question('Enter a message: ', (message) => {
      sendMessage(socket, message);
      startClient();
    });
  });

  socket.on('error', (err) => {
    console.error(`Error connecting to ${HOST}:${PORT}: ${err}`);
    rl.close();
  });

  socket.on('end', () => {
    console.log(`Connection closed by ${HOST}:${PORT}`);
    rl.close();
  });
}

startClient();
