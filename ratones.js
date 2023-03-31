const net = require('net');
const fs = require('fs');
const process = require('process');

const args = process.argv.slice(2);

if (args.length < 4) {
  console.error('Uso: node script.js portaEntrada portaDestino hostDestino tag');
  process.exit(1);
}

const [portaEntrada, portaDestino, hostDestino, tag] = args;

const server = net.createServer((socket) => {
  let receivedData = '';

  socket.on('data', (data) => {
    receivedData += data.toString('utf8');
  });

  socket.on('end', () => {
    console.log(`[${tag}] ${receivedData}`);
    fs.appendFileSync('output.txt', `[${tag}] ${receivedData}\n`, 'utf8');

    const destinationSocket = net.createConnection({ port: parseInt(portaDestino), host: hostDestino }, () => {
      destinationSocket.write(receivedData);
    });

    destinationSocket.on('error', (err) => {
      console.error(`Erro ao conectar ao hostDestino: ${hostDestino}:${portaDestino} - ${err.message}`);
    });

    destinationSocket.on('close', () => {
     
  console.log(`Dados enviados para ${hostDestino}:${portaDestino}`);
  destinationSocket.destroy();
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
