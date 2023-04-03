const net = require('net');
const fs = require('fs');

// Recebe o número da porta como argumento de linha de comando
const porta = process.argv[2];

// Cria o socket server
const server = net.createServer(socket => {
  console.log('Novo cliente conectado');

  // Imprime o nome e o conteúdo do evento 'data'
  socket.on('data', data => {
    // Identifica o encode dos dados recebidos
    const encoding = detectEncoding(data);

    console.log(`Dados recebidos do cliente: ${data.toString(encoding)}`);

  });

  // Imprime o nome do evento 'end'
  socket.on('end', () => {
    console.log('Cliente desconectado');
  });
});

// Imprime o nome do evento 'listening' quando o servidor começa a escutar a porta
server.on('listening', () => {
  console.log(`Socket server escutando na porta ${porta}`);
});

// Imprime o nome do evento 'error' em caso de erro
server.on('error', err => {
  console.error(`Erro no socket server: ${err}`);
});

// Inicia o servidor na porta especificada
server.listen(porta);

// Função para identificar o encode dos dados recebidos
function detectEncoding(buffer) {
  const encodings = ['utf8', 'ascii', 'utf16le', 'ucs2', 'base64', 'latin1', 'binary', 'hex'];

  for (let i = 0; i < encodings.length; i++) {
    try {
      const str = buffer.toString(encodings[i]);
      if (str === buffer.toString()) {
        console.log(encodings[i])
        return encodings[i];
      }
    } catch (e) {}
  }

  return null;
}

