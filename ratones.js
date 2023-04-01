const fs = require('fs');
const http = require('http');
const io = require('socket.io');
const ioClient = require('socket.io-client');
const process = require('process');

const args = process.argv.slice(2);

if (args.length < 4) {
  console.error('Uso: node script.js portaEntrada portaDestino hostDestino tag');
  process.exit(1);
}

const [portaEntrada, portaDestino, hostDestino, tag] = args;

const server = http.createServer();
const socketServer = io(server);

socketServer.on('connection', (socket) => {
  let receivedData = '';

  socket.on('message', (data) => {
    receivedData += data.toString('utf8');
  });

  socket.on('disconnect', () => {
    console.log(`[${tag}] ${receivedData}`);
    fs.appendFileSync('output.txt', `[${tag}] ${receivedData}\n`, 'utf8');

    const destinationSocket = ioClient(`${hostDestino}:${portaDestino}`);

    destinationSocket.on('connect', () => {
      destinationSocket.emit('message', receivedData);
      destinationSocket.disconnect();
    });

    destinationSocket.on('connect_error', (err) => {
      console.error(`Erro ao conectar ao hostDestino: ${hostDestino}:${portaDestino} - ${err.message}`);
});
});

socket.on('error', (err) => {
console.error(Erro no socket de entrada: ${err.message});
});
});

server.listen(parseInt(portaEntrada), () => {
console.log(Servidor escutando na porta ${portaEntrada});
});

server.on('error', (err) => {
console.error(Erro no servidor: ${err.message});
});
