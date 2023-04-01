const fs = require('fs');
const http = require('http');
const io = require('socket.io');
const process = require('process');

const args = process.argv.slice(2);

if (args.length < 1) {
  console.error('Uso: node script.js porta');
  process.exit(1);
}

const [porta] = args;

const server = http.createServer();
const socketServer = io(server);

socketServer.on('connection', (socket) => {
  socket.onAny((eventName, ...args) => {
    const eventData = JSON.stringify(args);
    console.log(`Evento: ${eventName} - Conteúdo: ${eventData}`);
    fs.appendFileSync('output.txt', `Evento: ${eventName} - Conteúdo: ${eventData}\n`, 'utf8');
  });

  socket.on('error', (err) => {
    console.error(`Erro no socket: ${err.message}`);
  });
});

server.listen(parseInt(porta), () => {
  console.log(`Servidor escutando na porta ${porta}`);
});

server.on('error', (err) => {
  console.error(`Erro no servidor: ${err.message}`);
});
