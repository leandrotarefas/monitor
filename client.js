const net = require('net');

// Recebe o número da porta e o host destino como argumentos de linha de comando
const [portDestino, hostDestino] = process.argv.slice(2);

// Cria o socket client
const client = new net.Socket();

// Conecta-se ao servidor
client.connect(portDestino, hostDestino, () => {
  console.log(`Conectado ao servidor ${hostDestino}:${portDestino}`);

  // Lê as mensagens digitadas pelo usuário no console e as envia para o servidor
  process.stdin.on('data', data => {
    client.write(data);
  });
});

// Imprime o nome e o conteúdo do evento 'data' quando recebe dados do servidor
client.on('data', data => {
  console.log(`Dados recebidos do servidor: ${data}`);
});

// Imprime o nome do evento 'close' quando a conexão é fechada
client.on('close', () => {
  console.log('Conexão fechada');
});
 
